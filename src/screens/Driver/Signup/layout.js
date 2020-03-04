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

export default class DriverSignup extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Initial', { userType: 'driver' })} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      passwordVisibility: true,
      passwordIcon: 'ios-eye',
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  goToInitial = () => this.navigateTo('Initial', { userType: 'driver' });

  goToLogin = () => this.navigateTo('Login', { userType: 'driver' });

  goToConfirmation = () => this.navigateTo('Confirm', { userType: 'driver' });

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility,
    }));
  };

  handleOnSignup = async (values, actions) => {
    try {
      const { addToNewUser } = this.props;
      const { phoneNumber } = values;
      const userType = 'driver';
      addToNewUser({ ...values, userType });

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);

      this.navigateTo('Confirm', { userType, phoneNumber });
    } catch (error) {
      actions.setFieldError('general', error.message);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  render() {
    const { initialValues } = this.props;
    const { passwordVisibility, passwordIcon } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Become a Driver</StyledHeadline>
          <SubHeadline>Sign up to start your application process</SubHeadline>
          <Form
            handleOnSubmit={this.handleOnSignup}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handlePasswordVisibility={this.handlePasswordVisibility}
            passwordVisibility={passwordVisibility}
            passwordIcon={passwordIcon}
            goToInitial={this.goToInitial}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </Container>
    );
  }
}

DriverSignup.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  addToNewUser: PropTypes.func.isRequired,
};
