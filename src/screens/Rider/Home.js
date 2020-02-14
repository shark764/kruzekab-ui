import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container } from '../../components/Form/Elements';
import FormButton from '../../components/Form/FormButton';
import { NavigationHeaderButtons, Item } from '../../components/Header/HeaderButton';
import { Input, Divider, Avatar } from 'react-native-elements';

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
const StyledImage = styled(Image)`
  flex: 1;
  width: null;
  height: null;
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
    selectedAddress: {
      from: {
        alias: 'Current location',
      },
      to: {},
    }
  }

  setSelectedAddress = (selectedAddress) => {
    console.log('entra selected', selectedAddress);
    this.setState(prevState =>({
      selectedAddress: {
        ...prevState.selectedAddress,
        [this.state.location]: selectedAddress,
      }
    }));

    console.log(this.state);
  }

  render() {
    return (
      <StyledContainer>
        <ImageContainer>
          <StyledImage source={require('../../assets/google-maps_preview.png')} />
        </ImageContainer>
        <View style={{
          position: 'absolute',
          right: 20, 
          bottom: 190
        }}>
          <Avatar
            rounded
            size='medium'
            icon={{ name: 'crosshairs-gps', type: 'material-community',  color: '#000000'}}
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
                
                this.props.navigation.navigate('SelectAddress', {addressPlaceholder: 'Where from?',  setSelectedAddress: this.setSelectedAddress});
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
                console.log('apoen')
                this.setState({
                  location: 'to'
                });
                
                this._navigateTo('SelectAddress', {addressPlaceholder: 'Where to?',  setSelectedAddress: this.setSelectedAddress});
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
