import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Form from './form';
import { validationSchema } from './validation';
import { Container, Headline } from '../../../components/Form/Elements';
import { GoBackButton } from '../../../components/Header/Navigator';

export default class VehicleRegister extends Component {
  state = {
    photo: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => <GoBackButton onPress={() => navigation.navigate('ProfilePhoto', { userType: 'driver' })} />
    };
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

  handleOnSubmit = async (values, actions) => {
    try {
      setTimeout(() => {
        this.props.addToNewUser({ ...values, carInsurancePicture: this.state.photo });
        //TODO: sent to api
        this.props.addNewUser();
        this.props.navigation.navigate('ApplicationReviewed', { userType: 'driver' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
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
