import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image, Platform, Dimensions,
} from 'react-native';
import styled from 'styled-components';
import {
  Input, Divider, Avatar, Overlay,
} from 'react-native-elements';
import MapView, {
  PROVIDER_GOOGLE, Marker, Polyline, Circle, AnimatedRegion,
} from 'react-native-maps';
import decodePolyline from 'decode-google-map-polyline';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Container } from '../../../components/Form/Elements';
import goal from '../../../assets/goal.png';
import pin from '../../../assets/ic_dest.png';
import car from '../../../assets/car_.png';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const StyledContainer = styled(Container)`
  align-items: center;
  justify-content: flex-end;
`;
const ImageContainer = styled(View)`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LocationView = styled(View)`
  position: absolute;
  height: 120px;
  left: 13px;
  right: 14px;
  bottom: 44px;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
`;

const LineView = styled(View)``;

const WhereToView = styled(View)`
  padding-top 20px;
  padding-left: 40px;
  padding-right: 10px;
`;

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0199;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let i = 0;
let to;
export default class Home extends Component {
  mapRef = null;

  carMarker = null;

  constructor(props) {
    super(props);

    this.state = {
      coords: [],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      regionLatitude: null,
      regionLongitude: null,
      mapLoaded: false,
      isOverlayVisible: false,
      carPosition: null,
      carAngle: 0,
    };
  }

  componentDidMount = () => {
    const { updateCurrentPosition, updateSelectedAddress } = this.props;
    Geolocation.getCurrentPosition(
      info => {
        updateCurrentPosition({
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
        });
        updateSelectedAddress('from', {
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
          name: 'Current position',
        });
        this.setState({
          mapLoaded: true,
          carPosition: new AnimatedRegion({
            longitude: info.coords.longitude,
            latitude: info.coords.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0004,
          }),
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  componentDidUpdate(prevProps) {
    const { selectedAddress } = this.props;
    if (prevProps.selectedAddress.get('to') !== selectedAddress.get('to') && selectedAddress.getIn(['to', 'name'])) {
      /* setTimeout(() => {
        this.setState({
          isOverlayVisible: false,
        });
        this.navigateTo('RideAccepted', {});
      }, 5000); */
      to = setInterval(this.carDemo, 5000);
    }
    // if selected address has changed (from or to) and coordinates exists for both locations
    if (
      (prevProps.selectedAddress.get('to') !== selectedAddress.get('to')
        || prevProps.selectedAddress.get('from') !== selectedAddress.get('from'))
      && selectedAddress.getIn(['to', 'latitude'])
      && selectedAddress.getIn(['from', 'latitude'])
    ) {
      this.drawRoute();
    }
  }

  carDemo = () => {
    const { coords, carPosition } = this.state;
    if (i > coords.length - 1) {
      clearInterval(to);
    } else {
      if (Platform.OS === 'android') {
        if (this.carMarker) {
          /* eslint-disable no-underscore-dangle */
          this.setState({
            carAngle: coords[i].angle,
          });
          this.carMarker._component.animateMarkerToCoordinate(coords[i], 1);
        }
      } else {
        carPosition.timing(coords[i]).start();
      }
      i += 1;
    }
  }

  decode = encoded => {
    const coords = decodePolyline(encoded);

    return coords.map((val, index) => ({
      longitude: val.lng,
      latitude: val.lat,
      angle: coords[index + 1]
        ? this.getBearing(coords[index], coords[index + 1])
        : this.getBearing(coords[index - 1], coords[index]),
    }));
  }

  drawRoute = async () => {
    const { selectedAddress } = this.props;
    const mode = 'driving'; // 'walking';
    const origin = `${selectedAddress.getIn(['from', 'latitude'])},${selectedAddress.getIn(['from', 'longitude'])}`;
    const destination = `${selectedAddress.getIn(['to', 'latitude'])},${selectedAddress.getIn(['to', 'longitude'])}`;
    const APIKEY = 'AIzaSyCH7pW8XhPRvUzm-JQ0f7aWVhN3QAUQO78';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    const { data } = await axios.get(url);
    if (data.routes.length) {
      const coords = this.decode(data.routes[0].overview_polyline.points);
      this.setState({
        coords,
        // isOverlayVisible: true,
      });
      this.mapRef.fitToCoordinates(coords, {
        edgePadding: {
          top: 0,
          right: 0,
          bottom: 25,
          left: 0,
        },
        animated: false,
      });
    }
  };

  getCurrentPosition = () => {
    const { updateCurrentPosition } = this.props;
    Geolocation.getCurrentPosition(
      info => updateCurrentPosition({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude,
      }),
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  setSelectedAddress = newSelectedAddress => {
    const { location, updateSelectedAddress, selectedAddress } = this.props;
    console.log(location);
    updateSelectedAddress(location, newSelectedAddress);
    if (selectedAddress.getIn(['to', 'name'])) {
      this.drawRoute();
    }
  };

  handleOpenDrawer = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  radians = n => n * (Math.PI / 180);

  degrees = n => n * (180 / Math.PI);

  getBearing = (startLocation, endLocation) => {
    const startLat = this.radians(startLocation.lat);
    const startLong = this.radians(startLocation.lng);
    const endLat = this.radians(endLocation.lat);
    const endLong = this.radians(endLocation.lng);

    let dLong = endLong - startLong;

    const dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) / Math.tan(startLat / 2.0 + Math.PI / 4.0));
    if (Math.abs(dLong) > Math.PI) {
      if (dLong > 0.0) {
        dLong = -(2.0 * Math.PI - dLong);
      } else {
        dLong = (2.0 * Math.PI + dLong);
      }
    }

    return (this.degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
  }

  render() {
    const {
      mapLoaded,
      regionLatitude,
      regionLongitude,
      coords,
      carPosition,
      carAngle,
      isOverlayVisible,
      latitudeDelta,
      longitudeDelta,
    } = this.state;
    const {
      currentPosition, selectedAddress, updateLocation, location,
    } = this.props;

    return (
      <StyledContainer>
        <ImageContainer>
          {mapLoaded === true ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              ref={ref => { this.mapRef = ref; }}
              style={styles.map}
              showsCompass={false}
              loadingEnabled
              region={{
                latitude: regionLatitude || currentPosition.get('latitude'),
                longitude: regionLongitude || currentPosition.get('longitude'),
                latitudeDelta,
                longitudeDelta,
              }}
            >
              <Marker.Animated
                ref={marker => {
                  this.carMarker = marker;
                }}
                style={{
                  transform: [
                    { rotate: `${carAngle}deg` },
                  ],
                  zIndex: 3,
                }}
                coordinate={carPosition}
                rotation={carPosition.angle}
              >
                <Image source={car} style={{ height: 30, width: 40 }} />
              </Marker.Animated>
              <Circle
                key={(currentPosition.get('latitude') + currentPosition.get('longitude')).toString()}
                center={currentPosition.toJS()}
                radius={20}
                strokeWidth={1}
                strokeColor="#4CCA8D"
                fillColor="rgba(134, 227, 154, 0.58)"
              />

              <Circle
                key={(currentPosition.get('latitude') + currentPosition.get('longitude') + 1).toString()}
                center={currentPosition.toJS()}
                radius={8}
                strokeWidth={4}
                strokeColor="#FDFDFD"
                fillColor="#4CCA8D"
              />

              {selectedAddress.getIn(['to', 'name']) && (
                <Marker
                  coordinate={{
                    latitude: selectedAddress.getIn(['to', 'latitude']) || 37.78825,
                    longitude: selectedAddress.getIn(['to', 'longitude']) || -122.4324,
                  }}
                  pinColor="red"
                >
                  <Image source={goal} style={{ height: 30, width: 30 }} />
                </Marker>
              )}

              {selectedAddress.getIn(['from', 'name']) && (
                <Marker
                  coordinate={{
                    latitude: selectedAddress.getIn(['from', 'latitude']) || 37.78825,
                    longitude: selectedAddress.getIn(['from', 'longitude']) || -122.4324,
                  }}
                  pinColor="blue"
                >
                  <Image source={pin} style={{ height: 40, width: 25 }} />
                </Marker>
              )}

              {coords.length > 0 && (
                <Polyline
                  coordinates={[
                    {
                      latitude: selectedAddress.getIn(['from', 'latitude']),
                      longitude: selectedAddress.getIn(['from', 'longitude']),
                    }, // optional
                    ...coords,
                    {
                      latitude: selectedAddress.getIn(['to', 'latitude']),
                      longitude: selectedAddress.getIn(['to', 'longitude']),
                    }, // optional
                  ]}
                  strokeWidth={4}
                  strokeColor="#6B768D"
                />
              )}
            </MapView>
          ) : (
            <Text>Loading...</Text>
          )}
        </ImageContainer>
        <View
          style={{
            position: 'absolute',
            left: 25,
            top: 25,
          }}
        >
          <Avatar
            rounded
            size="medium"
            icon={{
              name: 'md-menu',
              type: 'ionicon',
              color: '#212226',
            }}
            onPress={this.handleOpenDrawer}
            activeOpacity={0.7}
            containerStyle={{ flex: 2 }}
            overlayContainerStyle={{
              backgroundColor: '#ffffff',
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            right: 20,
            bottom: 190,
          }}
        >
          <Avatar
            rounded
            size="medium"
            icon={{ name: 'crosshairs-gps', type: 'material-community', color: '#000000' }}
            onPress={this.getCurrentPosition}
            activeOpacity={0.7}
            containerStyle={{ flex: 2, marginLeft: 20, marginTop: 115 }}
            overlayContainerStyle={{
              backgroundColor: '#FFFFFF',
            }}
          />
        </View>
        <LocationView>
          <LineView>
            <Text
              style={{
                color: location === 'from' ? '#5280E2' : '#212226',
                position: 'absolute',
                left: 12,
                fontSize: 15,
                top: 15,
              }}
            >
              ●
            </Text>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: 'black',
                position: 'absolute',
                height: 40,
                left: 20,
                top: 35,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                fontSize: 15,
                left: 13,
                top: 70,
                color: location === 'to' ? '#5280E2' : '#212226',
              }}
            >
              ▼
            </Text>
          </LineView>
          <WhereToView>
            <Input
              placeholder="from ?"
              value={selectedAddress.getIn(['from', 'alias']) || selectedAddress.getIn(['from', 'name'])}
              onFocus={() => {
                updateLocation('from');
                this.navigateTo('SelectAddress', {
                  addressPlaceholder: 'Where from?',
                  // setSelectedAddress: this.setSelectedAddress
                });
              }}
              inputContainerStyle={{
                borderColor: 'white',
              }}
            />
            <Divider />
            <Input
              placeholder="Where to?"
              value={selectedAddress.getIn(['to', 'alias']) || selectedAddress.getIn(['to', 'name'])}
              onFocus={() => {
                updateLocation('to');
                this.navigateTo('SelectAddress', {
                  addressPlaceholder: 'Where to?',
                  setSelectedAddress: this.setSelectedAddress,
                });
              }}
              inputContainerStyle={{
                borderColor: 'white',
              }}
            />
          </WhereToView>
        </LocationView>
        {mapLoaded && selectedAddress.getIn(['to', 'name']) && coords && (
          <Overlay
            isVisible={isOverlayVisible}
            windowBackgroundColor="rgba(0, 0, 0, 0.8)"
            overlayBackgroundColor="rgba(0, 0, 0, 0)"
            overlayStyle={{ elevation: 0 }}
            width="auto"
            height="auto"
          >
            <View
              style={{
                position: 'absolute',
                left: -75,
                top: -295,
              }}
            >
              <Avatar
                rounded
                size="medium"
                icon={{
                  name: 'md-close',
                  type: 'ionicon',
                  color: '#212226',
                }}
                onPress={this.handleOpenDrawer}
                activeOpacity={0.7}
                containerStyle={{ flex: 2 }}
                overlayContainerStyle={{
                  backgroundColor: '#ffffff',
                }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                  backgroundColor: 'rgba(134, 227, 154, 0.58)',
                  boxSizing: 'border-box',
                }}
              >
                <Image
                  source={pin}
                  style={{
                    height: 40,
                    width: 25,
                    left: 37,
                    top: 20,
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: 20,
                  lineHeight: 28,
                  textAlign: 'center',
                  letterSpacing: 0.2,
                  color: '#ffffff',
                }}
              >
                Searching drivers...
              </Text>
            </View>
          </Overlay>
        )}
      </StyledContainer>
    );
  }
}

Home.propTypes = {
  updateCurrentPosition: PropTypes.func.isRequired,
  updateSelectedAddress: PropTypes.func.isRequired,
  selectedAddress: PropTypes.shape({
    toJS: PropTypes.func,
    getIn: PropTypes.func,
    get: PropTypes.func,
  }).isRequired,
  location: PropTypes.string.isRequired,
  currentPosition: PropTypes.shape({
    toJS: PropTypes.func,
    getIn: PropTypes.func,
    get: PropTypes.func,
  }).isRequired,
  updateLocation: PropTypes.func.isRequired,
};
