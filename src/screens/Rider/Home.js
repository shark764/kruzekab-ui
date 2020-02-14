import React, { Component, Fragment } from 'react';
import { View, Image, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container } from '../../components/Form/Elements';
import FormButton from '../../components/Form/FormButton';
import { NavigationHeaderButtons, Item } from '../../components/Header/HeaderButton';
import { Input, Divider, Avatar } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

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
  background: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
`;

const LineView = styled(View)`

`;

const WhereToView = styled(View)`
  padding-top 20px;
  padding-left: 40px;
  padding-right: 10px;
`;

export default class Home extends Component {
  /*static navigationOptions = ({ navigation, navigation: { state } }) => {
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
  decode = (t, e) => { for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) { a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]) } return d = d.map(function (t) { return { latitude: t[0], longitude: t[1] } }) }

  drawRoute = async () => {
    const mode = 'driving'; // 'walking';
    const origin = `${this.state.currentPosition.latitude},${this.state.currentPosition.longitude}`;
    const destination = `${this.state.selectedAddress.to.geometry.location.lat},${this.state.selectedAddress.to.geometry.location.lng}`;
    const APIKEY = 'AIzaSyCH7pW8XhPRvUzm-JQ0f7aWVhN3QAUQO78';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
   let { data } = await axios.get(url);
   if(data.routes.length){
     this.setState({
      coords: this.decode(data.routes[0].overview_polyline.points) // definition below
     });
   }
  }

  componentDidMount = async () => {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        currentPosition: {
          longitude: info.coords.longitude,
          latitude: info.coords.latitude
        },
        mapLoaded: true,
      })
    }),
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 }

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
    location: 'to',
    coords: null,
    currentPosition: {
      longitude: 90,
      latitude: 180,
    },
    mapLoaded: false,
    selectedAddress: {
      from: {
        alias: 'Current location',
      },
      to: {},
    }
  }

  setSelectedAddress = (selectedAddress) => {
    this.setState(prevState => ({
      selectedAddress: {
        ...prevState.selectedAddress,
        [this.state.location]: selectedAddress,
      }
    }));
    if(this.state.selectedAddress.to.name){
      this.drawRoute();
    }
  }

  render() {
    return (
      <StyledContainer>
        <ImageContainer>
          {
            this.state.mapLoaded === true ? (
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                  latitude: this.state.currentPosition.latitude || 37.78825,
                  longitude: this.state.currentPosition.longitude || -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.currentPosition.latitude || 37.78825,
                    longitude: this.state.currentPosition.longitude || -122.4324,
                  }}
                  pinColor='red'>

                </Marker>

                {this.state.selectedAddress.to.name && (
                  <Marker
                    coordinate={{
                      latitude: this.state.selectedAddress.to.geometry.location.lat || 37.78825,
                      longitude: this.state.selectedAddress.to.geometry.location.lng || -122.4324,
                    }}
                    pinColor='blue'>

                  </Marker>
                )}

                {this.state.coords && (
                  <Polyline
                  coordinates={[
                      {latitude: this.state.currentPosition.latitude, longitude: this.state.currentPosition.longitude}, // optional
                      ...this.state.coords,
                      {latitude: this.state.selectedAddress.to.geometry.location.lat,
                      longitude: this.state.selectedAddress.to.geometry.location.lng }, // optional
                  ]}
                  strokeWidth={4}
                  strokeColor='#6B768D'
              />
                )}
              </MapView>
            ) : (
                <Text>Loading...</Text>
              )
          }
        </ImageContainer>
        <View style={{
          position: 'absolute',
          right: 20,
          bottom: 190
        }}>
          <Avatar
            rounded
            size='medium'
            icon={{ name: 'crosshairs-gps', type: 'material-community', color: '#000000' }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{ flex: 2, marginLeft: 20, marginTop: 115 }}
            overlayContainerStyle={{
              backgroundColor: '#FFFFFF'
            }}
          />
        </View>
        {/* <View>
          <FormButton
            onPress={() => this._navigateTo('Riders', { userType: 'rider' })}
            title="Family"
            textColor="white"
          />
        </View>
        <View>
          <FormButton
            onPress={() => this._navigateTo('Groups', { userType: 'rider' })}
            title="Groups"
            textColor="white"
          />
       </View>*/ }
        <LocationView>
          <LineView>
            <Text
              style={{
                color: this.state.location === 'from' ? '#5280E2' : '#212226',
                position: 'absolute',
                left: 16,
                fontSize: 15,
                top: 17
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
                top: 35,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                left: 15,
                fontSize: 15,
                left: 13,
                top: 70,
                color: this.state.location === 'to' ? '#5280E2' : '#212226',
              }}>
              ▼
            </Text>
          </LineView>
          <WhereToView>
            <Input
              placeholder='from ?'
              value={this.state.selectedAddress.from.alias || this.state.selectedAddress.from.name}
              onFocus={() => {
                this.setState({
                  location: 'from'
                });

                this.props.navigation.navigate('SelectAddress', { addressPlaceholder: 'Where from?', setSelectedAddress: this.setSelectedAddress });
              }}
              inputContainerStyle={{
                borderColor: 'white'
              }}>

            </Input>
            <Divider></Divider>
            <Input
              placeholder='Where to?'
              value={this.state.selectedAddress.to.alias || this.state.selectedAddress.to.name}
              onFocus={() => {
                this.setState({
                  location: 'to'
                });
                this._navigateTo('SelectAddress', { addressPlaceholder: 'Where to?', setSelectedAddress: this.setSelectedAddress, currentPosition: this.state.currentPosition });
              }}
              inputContainerStyle={{
                borderColor: 'white'
              }}>

            </Input>
          </WhereToView>
        </LocationView>
      </StyledContainer>
    );
  }
}
