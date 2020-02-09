import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, SubHeadline, Headline } from '../../../components/Form/Elements';
import Form from './form';
import { validationSchema } from './validation';
import { Button } from 'react-native-elements';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;

export default class Login extends Component {
  state = {
    passwordVisibility: true,
    passwordIcon: 'ios-eye'
  };

  goToSignup = () => this.props.navigation.navigate('Signup', { userType: null });

  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword', { userType: null });

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleOnLogin = async (values, actions) => {
    try {
      // const response = await this.props.firebase.loginWithEmail(email, password);

      // if (response.user) {
      //   this.props.navigation.navigate('App', { userType: null });
      // }
      setTimeout(() => {
        this.props.navigation.navigate('App', { userType: null });
        // this.props.navigation.navigate('Signup', { userType: null });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // TODO:
      // This is avoiding submit button loading icon
      // actions.setSubmitting(false);
    }
  };

  render() {
    console.log('Nav param', 'Login', this.props.navigation.getParam('userType', null));

    const { passwordVisibility, passwordIcon } = this.state;
    return (
      <Container>
        <Headline>Welcome</Headline>
        <SubHeadline>Login to your Account</SubHeadline>
        <Form
          handleOnSubmit={this.handleOnLogin}
          initialValues={{
            name: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            email: '',
            userType: '',
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
          goToSignup={this.goToSignup}
          goToForgotPassword={this.goToForgotPassword}
        />
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#5280e2'
          }}
          type="clear"
        />
        {/* <TouchableOpacity onPress={this.goToSignup}>
          <Text> Touch Here </Text>
        </TouchableOpacity> */}
      </Container>
    );
  }
}
