import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Form from './form';
import { validationSchema } from './validation';
import { Container, Headline } from '../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';
import { GoBackButton } from '../../../components/Header/Navigator';

export default class DriverInformation extends Component {
  state = {
    photo: null
  };

  static navigationOptions = ({        navigation, navigation: { state } }) => {
    return {
      headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Confirm', { userType: 'driver' })} />
    };
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: 'driver' });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: 'driver' });

  handleOnSubmit = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      setTimeout(() => {
        this.props.navigation.navigate('ProfilePhoto', { userType: 'driver' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
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
    console.log('Nav param', 'DriverInformation', this.props.navigation.getParam('userType', null));

    const { photo } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Headline>Driver Information</Headline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              gender: 'male',
              birthdate: '',
              licenseNumber: '',
              trafficViolation: 'no',
              check: false
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
