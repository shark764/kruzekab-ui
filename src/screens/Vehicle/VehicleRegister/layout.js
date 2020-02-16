import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Form from './form';
import { validationSchema } from './validation';
import { Container, Headline } from '../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';

export default class VehicleRegister extends Component {
  state = {
    photo: null
  };

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
            onPress={() => navigation.navigate('ProfilePhoto', { userType: 'driver' })}
          />
        </NavigationHeaderButtons>
      ),
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      }
    };
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

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
        this.props.navigation.navigate('ApplicationReviewed', { userType: 'driver' });
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

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('Upload a picture');
        this.setState({ photo: response });
      }
    });
  };

  render() {
    console.log('Nav param', 'VehicleRegister', this.props.navigation.getParam('userType', null));

    const { photo } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Headline>Vehicle Information</Headline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              car: '',
              model: '',
              vehicleYear: `${new Date().getFullYear()}`,
              maxSeats: '4'
            }}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </Container>
    );
  }
}
