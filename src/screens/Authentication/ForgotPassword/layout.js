import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import Form from './form';
import validationSchema from './validation';
import { Headline, SubHeadline, Container } from '../../../components/Form/Elements';
import { GoBackButton } from '../../../components/Header/Navigator';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;

export default class ForgotPassword extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Initial', { userType: 'driver' })} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      passwordVisibility: true,
      confirmPasswordVisibility: true,
      passwordIcon: 'ios-eye',
      confirmPasswordIcon: 'ios-eye',
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility,
    }));
  };

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon: prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility,
    }));
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { navigation } = this.props;
      const { phoneNumber } = values;
      const userType = navigation.getParam('userType', null);

      this.navigateTo('Confirm', { userType, phoneNumber });
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
    }
  };

  render() {
    const { initialValues } = this.props;

    const {
      passwordVisibility, confirmPasswordVisibility, passwordIcon, confirmPasswordIcon,
    } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Reset your password</StyledHeadline>
          <SubHeadline>You will receive a SMS verification code</SubHeadline>
          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handlePasswordVisibility={this.handlePasswordVisibility}
            passwordVisibility={passwordVisibility}
            passwordIcon={passwordIcon}
            handleConfirmPasswordVisibility={this.handleConfirmPasswordVisibility}
            confirmPasswordVisibility={confirmPasswordVisibility}
            confirmPasswordIcon={confirmPasswordIcon}
          />
        </ScrollView>
      </Container>
    );
  }
}

ForgotPassword.propTypes = {
  initialValues: PropTypes.shape.isRequired,
};
