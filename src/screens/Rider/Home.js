import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container } from '../../components/Form/Elements';
import FormButton from '../../components/Form/FormButton';
import { NavigationHeaderButtons, Item } from '../../components/Header/HeaderButton';

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

export default class Home extends Component {
  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
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

  render() {
    console.log('Nav param', 'Home', this.props.navigation.getParam('userType', null));

    return (
      <StyledContainer>
        <ImageContainer>
          <StyledImage source={require('../../assets/google-maps_preview.png')} />
        </ImageContainer>
        <View>
          <FormButton onPress={this.handleSignout} title="Sign out" textColor="white" />
        </View>
        <View>
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
        </View>
      </StyledContainer>
    );
  }
}
