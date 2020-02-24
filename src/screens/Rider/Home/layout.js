import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styled from 'styled-components';
import { Container } from '../../../components/Form/Elements';
import { Input, Divider, Avatar, Overlay } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import goal from '../../../assets/goal.png';
import pin from '../../../assets/ic_dest.png';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
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

  decode = (t, e) => {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length; ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1), (l += n), (r += o), d.push([l / c, r / c]);
    }
    return (d = d.map(function(t) {
      return { latitude: t[0], longitude: t[1] };
    }));
  };

  drawRoute = async () => {
    const mode = 'driving'; // 'walking';
    const origin = `${this.props.selectedAddress.getIn(['from', 'latitude'])},${this.props.selectedAddress.getIn([
      'from',
      'longitude'
    ])}`;
    const destination = `${this.props.selectedAddress.getIn(['to', 'latitude'])},${this.props.selectedAddress.getIn([
      'to',
      'longitude'
    ])}`;
    const APIKEY = 'AIzaSyCH7pW8XhPRvUzm-JQ0f7aWVhN3QAUQO78';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    let { data } = await axios.get(url);
    if (data.routes.length) {
      const coords = this.decode(data.routes[0].overview_polyline.points);
      this.setState({
        coords,
        isOverlayVisible: true
      });
      this.mapRef.fitToCoordinates(coords, { edgePadding: { top: 0, right: 0, bottom: 25, left: 0 }, animated: false });
    }
  };

  getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      info =>
        this.props.updateCurrentPosition({
          longitude: info.coords.longitude,
          latitude: info.coords.latitude
        }),
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  componentDidMount = () => {
    Geolocation.getCurrentPosition(
      info => {
        this.props.updateCurrentPosition({
          longitude: info.coords.longitude,
          latitude: info.coords.latitude
        });
        this.props.updateSelectedAddress('from', {
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
          name: 'Current position'
        });
        this.setState({
          mapLoaded: true
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedAddress.get('to') !== this.props.selectedAddress.get('to') &&
      this.props.selectedAddress.getIn(['to', 'name'])
    ) {
      setTimeout(() => {
        this.setState({
          isOverlayVisible: false
        });
        this._navigateTo('RideAccepted', {});
      }, 5000);
    }
    // if selected address has changed (from or to) and coordinates exists for both locations
    if (
      (prevProps.selectedAddress.get('to') !== this.props.selectedAddress.get('to') ||
        prevProps.selectedAddress.get('from') !== this.props.selectedAddress.get('from')) &&
      this.props.selectedAddress.getIn(['to', 'latitude']) &&
      this.props.selectedAddress.getIn(['from', 'latitude'])
    ) {
      this.drawRoute();
    }
  }

  handleSignout = async () => {
    try {
      // await this.props.firebase.signOut();
      setTimeout(() => {
        this.props.navigation.navigate('Initial', { userType: null });
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  _navigateTo = (destinationScreen, params = {}) => {
    this.props.navigation.navigate(destinationScreen, params);
  };

  state = {
    coords: null,
    latitudeDelta: 0.01,
    longitudeDelta: 0.0004,
    regionLatitude: null,
    regionLongitude: null,
    mapLoaded: false,
    isOverlayVisible: false
  };

  setSelectedAddress = selectedAddress => {
    console.log(this.props.location);
    this.props.updateSelectedAddress(this.props.location, selectedAddress);
    if (this.props.selectedAddress.getIn(['to', 'name'])) {
      this.drawRoute();
    }
  };

  handleOpenDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <StyledContainer>
        <ImageContainer>
          {this.state.mapLoaded === true ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              ref={ref => (this.mapRef = ref)}
              style={styles.map}
              showsCompass={false}
              loadingEnabled={true}
              region={{
                latitude: this.state.regionLatitude || this.props.currentPosition.get('latitude'),
                longitude: this.state.regionLongitude || this.props.currentPosition.get('longitude'),
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta
              }}>
              <Circle
                key={(
                  this.props.currentPosition.get('latitude') + this.props.currentPosition.get('longitude')
                ).toString()}
                center={this.props.currentPosition.toJS()}
                radius={20}
                strokeWidth={1}
                strokeColor={'#4CCA8D'}
                fillColor={'rgba(134, 227, 154, 0.58)'}
              />

              <Circle
                key={(
                  this.props.currentPosition.get('latitude') +
                  this.props.currentPosition.get('longitude') +
                  1
                ).toString()}
                center={this.props.currentPosition.toJS()}
                radius={8}
                strokeWidth={4}
                strokeColor={'#FDFDFD'}
                fillColor={'#4CCA8D'}
              />

              {this.props.selectedAddress.getIn(['to', 'name']) && (
                <Marker
                  coordinate={{
                    latitude: this.props.selectedAddress.getIn(['to', 'latitude']) || 37.78825,
                    longitude: this.props.selectedAddress.getIn(['to', 'longitude']) || -122.4324
                  }}
                  pinColor="red">
                  <Image source={goal} style={{ height: 30, width: 30 }} />
                </Marker>
              )}

              {this.props.selectedAddress.getIn(['from', 'name']) && (
                <Marker
                  coordinate={{
                    latitude: this.props.selectedAddress.getIn(['from', 'latitude']) || 37.78825,
                    longitude: this.props.selectedAddress.getIn(['from', 'longitude']) || -122.4324
                  }}
                  pinColor="blue">
                  <Image source={pin} style={{ height: 40, width: 25 }} />
                </Marker>
              )}

              {this.state.coords && (
                <Polyline
                  coordinates={[
                    {
                      latitude: this.props.selectedAddress.getIn(['from', 'latitude']),
                      longitude: this.props.selectedAddress.getIn(['from', 'longitude'])
                    }, // optional
                    ...this.state.coords,
                    {
                      latitude: this.props.selectedAddress.getIn(['to', 'latitude']),
                      longitude: this.props.selectedAddress.getIn(['to', 'longitude'])
                    } // optional
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
            top: 25
          }}>
          <Avatar
            rounded
            size="medium"
            icon={{
              name: 'md-menu',
              type: 'ionicon',
              color: '#212226'
            }}
            onPress={this.handleOpenDrawer}
            activeOpacity={0.7}
            containerStyle={{ flex: 2 }}
            overlayContainerStyle={{
              backgroundColor: '#ffffff'
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            right: 20,
            bottom: 190
          }}>
          <Avatar
            rounded
            size="medium"
            icon={{ name: 'crosshairs-gps', type: 'material-community', color: '#000000' }}
            onPress={this.getCurrentPosition}
            activeOpacity={0.7}
            containerStyle={{ flex: 2, marginLeft: 20, marginTop: 115 }}
            overlayContainerStyle={{
              backgroundColor: '#FFFFFF'
            }}
          />
        </View>
        <LocationView>
          <LineView>
            <Text
              style={{
                color: this.props.location === 'from' ? '#5280E2' : '#212226',
                position: 'absolute',
                left: 12,
                fontSize: 15,
                top: 15
              }}>
              ●
            </Text>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: 'black',
                position: 'absolute',
                height: 40,
                left: 20,
                top: 35
              }}
            />
            <Text
              style={{
                position: 'absolute',
                left: 15,
                fontSize: 15,
                left: 13,
                top: 70,
                color: this.props.location === 'to' ? '#5280E2' : '#212226'
              }}>
              ▼
            </Text>
          </LineView>
          <WhereToView>
            <Input
              placeholder="from ?"
              value={
                this.props.selectedAddress.getIn(['from', 'alias']) ||
                this.props.selectedAddress.getIn(['from', 'name'])
              }
              onFocus={() => {
                this.props.updateLocation('from');
                this._navigateTo('SelectAddress', {
                  addressPlaceholder: 'Where from?'
                  //setSelectedAddress: this.setSelectedAddress
                });
              }}
              inputContainerStyle={{
                borderColor: 'white'
              }}></Input>
            <Divider></Divider>
            <Input
              placeholder="Where to?"
              value={
                this.props.selectedAddress.getIn(['to', 'alias']) || this.props.selectedAddress.getIn(['to', 'name'])
              }
              onFocus={() => {
                this.props.updateLocation('to');
                this._navigateTo('SelectAddress', {
                  addressPlaceholder: 'Where to?',
                  setSelectedAddress: this.setSelectedAddress
                });
              }}
              inputContainerStyle={{
                borderColor: 'white'
              }}></Input>
          </WhereToView>
        </LocationView>
        {this.state.mapLoaded && this.props.selectedAddress.getIn(['to', 'name']) && this.state.coords && (
          <Overlay
            isVisible={this.state.isOverlayVisible}
            windowBackgroundColor="rgba(0, 0, 0, 0.8)"
            overlayBackgroundColor="rgba(0, 0, 0, 0)"
            overlayStyle={{ elevation: 0 }}
            width="auto"
            height="auto">
            <View
              style={{
                position: 'absolute',
                left: -75,
                top: -295
              }}>
              <Avatar
                rounded
                size="medium"
                icon={{
                  name: 'md-close',
                  type: 'ionicon',
                  color: '#212226'
                }}
                onPress={this.handleOpenDrawer}
                activeOpacity={0.7}
                containerStyle={{ flex: 2 }}
                overlayContainerStyle={{
                  backgroundColor: '#ffffff'
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
                  boxSizing: 'border-box'
                }}>
                <Image source={pin} style={{ height: 40, width: 25, left: 37, top: 20 }} />
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
                  color: '#ffffff'
                }}>
                Searching drivers...
              </Text>
            </View>
          </Overlay>
        )}
      </StyledContainer>
    );
  }
}
