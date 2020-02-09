import React, { Component } from 'react';
import Form from './form';
import { validationSchema } from './validation';
import { Container, Title } from '../../../components/Form/Elements';

export default class ForgotPassword extends Component {
  state = {
    confirmationSent: false
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToSignup = () => this.props.navigation.navigate('Signup', { userType: null });

  handlePasswordReset = async (values, actions) => {
    try {
      // await this.props.firebase.passwordReset(email);
      console.log('Password reset email sent successfully');
      this.props.navigation.navigate('Login', { userType: null });
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  render() {
    console.log('Nav param', 'ForgotPassword', this.props.navigation.getParam('userType', null));

    return (
      <Container>
        <Title>Forgot Password?</Title>

        <Form
          handleOnSubmit={this.handlePasswordReset}
          initialValues={{
            phoneNumber: '',
            email: ''
          }}
          validationSchema={validationSchema}
          handleChoosePhoto={this.handleChoosePhoto}
          goToLogin={this.goToLogin}
          goToSignup={this.goToSignup}
        />
      </Container>
    );
  }
}
