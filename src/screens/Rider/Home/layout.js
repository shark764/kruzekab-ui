import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import styled from 'styled-components';
import {
  Input, Divider, Avatar, Overlay,
} from 'react-native-elements';
import MapView, {
  PROVIDER_GOOGLE, Marker, Polyline, Circle,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Container } from '../../../components/Form/Elements';
import goal from '../../../assets/goal.png';
import pin from '../../../assets/ic_dest.png';

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

export default class Home extends Component {
  mapRef = null;

  constructor(props) {
    super(props);

    this.state = {
      coords: null,
      latitudeDelta: 0.01,
      longitudeDelta: 0.0004,
      regionLatitude: null,
      regionLongitude: null,
      mapLoaded: false,
      isOverlayVisible: false,
    };
  }

  decode = (t, e) => {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1), (l += n), (r += o), d.push([l / c, r / c]);
    }
    return (d = d.map(t => ({ latitude: t[0], longitude: t[1] })));
  };

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
        isOverlayVisible: true,
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
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  componentDidUpdate(prevProps) {
    const { selectedAddress } = this.props;
    if (prevProps.selectedAddress.get('to') !== selectedAddress.get('to') && selectedAddress.getIn(['to', 'name'])) {
      setTimeout(() => {
        this.setState({
          isOverlayVisible: false,
        });
        this.navigateTo('RideAccepted', {});
      }, 5000);
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

  render() {
    const {
      mapLoaded,
      regionLatitude,
      regionLongitude,
      coords,
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
              ref={ref => (this.mapRef = ref)}
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

              {coords && (
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
  selectedAddress: PropTypes.shape.isRequired,
  location: PropTypes.shape.isRequired,
  currentPosition: PropTypes.shape.isRequired,
  updateLocation: PropTypes.func.isRequired,
};
