import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Form from './form';
import { validationSchema } from './validation';
import { Headline, SubHeadline, Container } from '../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';
import { GoBackButton } from '../../../components/Header/Navigator';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;

export default class DriverSignup extends Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  };

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Initial', { userType: 'driver' })} />
    };
  };

  goToInitial = () => this.props.navigation.navigate('Initial', { userType: 'driver' });

  goToLogin = () => this.props.navigation.navigate('Login', { userType: 'driver' });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: 'driver' });

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon: prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }));
  };

  handleOnSignup = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);
      const { phoneNumber } = values;

      setTimeout(() => {
        // this.props.navigation.navigate('VehicleRegister', { userType: null });
        this.props.navigation.navigate('Confirm', { userType: 'driver', phoneNumber });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  render() {
    console.log('Nav param', 'DriverSignup', this.props.navigation.getParam('userType', null));

    const { passwordVisibility, confirmPasswordVisibility, passwordIcon, confirmPasswordIcon } = this.state;
    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Reset your password</StyledHeadline>
          <SubHeadline>You will receive a SMS verification code</SubHeadline>
          <Form
            handleOnSubmit={this.handleOnSignup}
            initialValues={{
              userType: 2,
              phoneNumber: '',
              newPassword: '',
              confirmNewPassword: ''
            }}
            validationSchema={validationSchema}
            handlePasswordVisibility={this.handlePasswordVisibility}
            passwordVisibility={passwordVisibility}
            passwordIcon={passwordIcon}
            handleConfirmPasswordVisibility={this.handleConfirmPasswordVisibility}
            confirmPasswordVisibility={confirmPasswordVisibility}
            confirmPasswordIcon={confirmPasswordIcon}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </Container>
    );
  }
}
