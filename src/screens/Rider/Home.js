import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styled from 'styled-components';
import { Container } from '../../components/Form/Elements';
import { Input, Divider, Avatar, Overlay, Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import goal from '../../assets/goal.png';
import pin from '../../assets/ic_dest.png';

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
  /*static navigationOptions = ({             navigation, navigation: { state } }) => {
     return {
       headerShown: false,
       headerTitle: () => null,
       headerLeft: () => (
         <NavigationHeaderButtons>
           <Item
             title="Go Back"
             buttonWrapperStyle={{
               marginLeft: 12,
               marginTop: 10
             }}
             useIconComponent={Ionicons}
             iconName="md-arrow-back"
             onPress={() => navigation.navigate('Initial', { userType: 'rider' })}
           />
         </NavigationHeaderButtons>
       ),
       headerStyle: {
         backgroundColor: 'transparent',
         elevation: 0,
         shadowOpacity: 0,
         borderBottomWidth: 0,
         shadowColor: 'transparent'
       }
     };
   };*/

  // static navigationOptions = ({             navigation }) => {
  //   return {
  //     drawerIcon: () => null,
  //     drawerLabel: () => null
  //   };
  // };
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
    const origin = `${this.state.selectedAddress.from.latitude},${this.state.selectedAddress.from.longitude}`;
    const destination = `${this.state.selectedAddress.to.latitude},${this.state.selectedAddress.to.longitude}`;
    const APIKEY = 'AIzaSyCH7pW8XhPRvUzm-JQ0f7aWVhN3QAUQO78';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
    let { data } = await axios.get(url);
    if (data.routes.length) {
      const coords = this.decode(data.routes[0].overview_polyline.points);
      this.setState({
        coords
      });
      this.mapRef.fitToCoordinates(coords, { edgePadding: { top: 0, right: 0, bottom: 25, left: 0 }, animated: false });
    }
  };

  getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      info =>
        this.setState({
          currentPosition: {
            longitude: info.coords.longitude,
            latitude: info.coords.latitude
          }
        }),
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  componentDidMount = () => {
    Geolocation.getCurrentPosition(
      info =>
        this.setState({
          currentPosition: {
            longitude: info.coords.longitude,
            latitude: info.coords.latitude
          },
          selectedAddress: {
            to: {},
            from: {
              longitude: info.coords.longitude,
              latitude: info.coords.latitude,
              name: 'Current position'
            }
          },
          mapLoaded: true
        }),
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

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
    location: 'to',
    coords: null,
    latitudeDelta: 0.01,
    longitudeDelta: 0.0004,
    regionLatitude: null,
    regionLongitude: null,
    currentPosition: {
      longitude: 90,
      latitude: 180
    },
    mapLoaded: false,
    selectedAddress: {
      from: {
        alias: 'Current location'
      },
      to: {}
    }
  };

  setSelectedAddress = selectedAddress => {
    this.setState(prevState => ({
      selectedAddress: {
        ...prevState.selectedAddress,
        [this.state.location]: selectedAddress
      }
    }));
    if (this.state.selectedAddress.to.name) {
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
                latitude: this.state.regionLatitude || this.state.currentPosition.latitude,
                longitude: this.state.regionLongitude || this.state.currentPosition.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta
              }}>
              <Circle
                key={(this.state.currentPosition.latitude + this.state.currentPosition.longitude).toString()}
                center={this.state.currentPosition}
                radius={20}
                strokeWidth={1}
                strokeColor={'#4CCA8D'}
                fillColor={'rgba(134, 227, 154, 0.58)'}
              />

              <Circle
                key={(this.state.currentPosition.latitude + this.state.currentPosition.longitude + 1).toString()}
                center={this.state.currentPosition}
                radius={8}
                strokeWidth={4}
                strokeColor={'#FDFDFD'}
                fillColor={'#4CCA8D'}
              />

              {this.state.selectedAddress.to.name && (
                <Marker
                  coordinate={{
                    latitude: this.state.selectedAddress.to.latitude || 37.78825,
                    longitude: this.state.selectedAddress.to.longitude || -122.4324
                  }}
                  pinColor="red">
                  <Image source={goal} style={{ height: 30, width: 30 }} />
                </Marker>
              )}

              {this.state.selectedAddress.from.name && (
                <Marker
                  coordinate={{
                    latitude: this.state.selectedAddress.from.latitude || 37.78825,
                    longitude: this.state.selectedAddress.from.longitude || -122.4324
                  }}
                  pinColor="blue">
                  <Image source={pin} style={{ height: 40, width: 25 }} />
                </Marker>
              )}

              {this.state.coords && (
                <Polyline
                  coordinates={[
                    {
                      latitude: this.state.selectedAddress.from.latitude,
                      longitude: this.state.selectedAddress.from.longitude
                    }, // optional
                    ...this.state.coords,
                    {
                      latitude: this.state.selectedAddress.to.latitude,
                      longitude: this.state.selectedAddress.to.longitude
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
                color: this.state.location === 'from' ? '#5280E2' : '#212226',
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
                color: this.state.location === 'to' ? '#5280E2' : '#212226'
              }}>
              ▼
            </Text>
          </LineView>
          <WhereToView>
            <Input
              placeholder="from ?"
              value={this.state.selectedAddress.from.alias || this.state.selectedAddress.from.name}
              onFocus={() => {
                this.setState({
                  location: 'from'
                });

                this.props.navigation.navigate('SelectAddress', {
                  addressPlaceholder: 'Where from?',
                  setSelectedAddress: this.setSelectedAddress,
                  currentPosition: this.state.currentPosition
                });
              }}
              inputContainerStyle={{
                borderColor: 'white'
              }}></Input>
            <Divider></Divider>
            <Input
              placeholder="Where to?"
              value={this.state.selectedAddress.to.alias || this.state.selectedAddress.to.name}
              onFocus={() => {
                this.setState({
                  location: 'to'
                });
                this._navigateTo('SelectAddress', {
                  addressPlaceholder: 'Where to?',
                  setSelectedAddress: this.setSelectedAddress,
                  currentPosition: this.state.currentPosition
                });
              }}
              inputContainerStyle={{
                borderColor: 'white'
              }}></Input>
          </WhereToView>
        </LocationView>

        {this.state.mapLoaded && this.state.selectedAddress.to.name && this.state.coords && (
          <Overlay
            isVisible={true}
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
