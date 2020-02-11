import React, { Component } from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonContainer, Container, Headline } from '../../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../../components/Header/HeaderButton';
import FormButton from '../../../../components/Form/FormButton';

const IconContainer = styled(ButtonContainer)`
  margin-bottom: 80px;
  margin-top: 70px;
  align-items: center;
`;

// const ImageHeader = props => (
//   <View style={{ backgroundColor: '#eee' }}>
//     <Image
//       style={{ /* width, */ height: 10 * vh, position: 'absolute', top: 0, left: 0 }}
//       source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
//     />
//     <Header {...props} style={{ backgroundColor: 'transparent' }} />
//   </View>
// );

export default class FamilyGroup extends Component {
  state = {};

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      title: 'Your Family',
      // headerTitle: () => 'Your Family',
      headerLeft: () => (
        <NavigationHeaderButtons>
          <Item
            title="Go Back"
            buttonWrapperStyle={{
              marginLeft: 12,
              marginTop: 10
              // borderRadius: '50%'
            }}
            // useIconComponent={Ionicons}
            ButtonElement={
              <Icon
                raised
                reverse
                name="add-a-photo"
                color="#dde5f7"
                reverseColor="#5280e2"
                size={70}
                onPress={() => this._navigateTo('NewMember', { userType: 'rider' })}
                disabled={false}
              />
            }
            iconName="ios-arrow-back"
            onPress={() => navigation.navigate('Home', { userType: 'rider' })}
          />
        </NavigationHeaderButtons>
      ),
      headerStyle: {
        backgroundColor: '#f4511e',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      },
      headerTintColor: '#fff',
      headerBackground: () => (
        <Image
          style={{ width: '100%', height: 80 }}
          source={require('../../../../assets/map.png')}
          // source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
        />
      ),
      headerTitleStyle: { color: '#fff', fontWeight: 'bold' }
    };
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  _navigateTo = (destinationScreen, params = {}) => {
    this.props.navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      // if (response.user.uid) {
      //   const { uid } = response.user;
      //   const userData = { email, name, uid };
      //   await this.props.firebase.createNewUser(userData);
      //   this.props.navigation.navigate('App', { userType: null });
      // }
      setTimeout(() => {
        this.props.navigation.navigate('VehicleRegister', { userType: 'rider' });
        // this.props.navigation.navigate('Login', { userType: null });
      }, 1500);
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message);
    } finally {
      // TODO:
      // This is avoiding submit button loading icon
      // actions.setSubmitting(false);
    }
  };

  render() {
    console.log('Nav param', 'FamilyGroup', this.props.navigation.getParam('userType', null));

    return (
      <Container enabled behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Headline>Riders</Headline>

          <IconContainer>
            <Icon
              raised
              reverse
              name="add-a-photo"
              color="#dde5f7"
              reverseColor="#5280e2"
              size={70}
              onPress={() => this._navigateTo('NewMember', { userType: 'rider' })}
              disabled={false}
            />
          </IconContainer>

          <ButtonContainer>
            <FormButton
              onPress={() => this._navigateTo('NewMember', { userType: 'rider' })}
              title="Next!!"
              textColor="white"
              disabled={false}
              loading={false}
            />
          </ButtonContainer>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image
              // style={StyleSheet.absoluteFill}
              style={{ width: '100%', height: 80 }}
              source={require('../../../../assets/map.png')}
              // source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}
