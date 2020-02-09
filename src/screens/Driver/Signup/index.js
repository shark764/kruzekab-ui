import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import Form from './form';
import { validationSchema } from './validation';
import { Headline, SubHeadline, Container } from '../../../components/Form/Elements';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;

export default class DriverSignup extends Component {
  state = {
    passwordVisibility: true,
    passwordIcon: 'ios-eye'
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: 'driver' });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: 'driver' });

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleOnSignup = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);
      const { phoneNumber } = values;

      // if (response.user.uid) {
      //   const { uid } = response.user;
      //   const userData = { email, name, uid };
      //   await this.props.firebase.createNewUser(userData);
      //   this.props.navigation.navigate('App', { userType: null });
      // }
      setTimeout(() => {
        // this.props.navigation.navigate('VehicleRegister', { userType: null });
        this.props.navigation.navigate('Confirm', { userType: 'driver', phoneNumber });
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
    console.log('Nav param', 'DriverSignup', this.props.navigation.getParam('userType', null));

    const { passwordVisibility, passwordIcon } = this.state;
    return (
      <Container enabled behavior="padding">
        <ScrollView>
          <StyledHeadline>Become a Driver</StyledHeadline>
          <SubHeadline>Sign up to start your application process</SubHeadline>
          <Form
            handleOnSubmit={this.handleOnSignup}
            initialValues={{
              userType: 2,
              name: '',
              lastName: '',
              phoneNumber: '',
              password: '',
              email: '',
              occupation: '',
              maxSeats: '',
              vehicleYear: '',
              licenseNumber: '',
              birthdate: '',
              profilePicture: '',
              licensePicture: '',
              gender: ''
            }}
            validationSchema={validationSchema}
            handlePasswordVisibility={this.handlePasswordVisibility}
            passwordVisibility={passwordVisibility}
            passwordIcon={passwordIcon}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </Container>
    );
  }
}
