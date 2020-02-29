import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import Form from './form';
import validationSchema from './validation';
import {
  Headline,
  SubHeadline,
  Container,
  BottomContainer,
  HelpButton,
  HelpButtonText,
} from '../../../components/Form/Elements';
import { GoBackButton } from '../../../components/Header/Navigator';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;
const StyledSubHeadline = styled(SubHeadline)`
  margin-bottom: 30px;
`;
const BolderHelpButtonText = styled(HelpButtonText)`
  font-weight: bold;
`;

export default class Signup extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Initial')} />,
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

  goToLogin = () => this.navigateTo('Login', { userType: 'rider' });

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
      const userType = 'rider';
      addToNewUser({ ...values, userType });

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
    const { passwordVisibility, passwordIcon } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Sign Up</StyledHeadline>
          <StyledSubHeadline>You will receive a SMS verification code</StyledSubHeadline>
          <Form
            handleOnSubmit={this.handleOnSignup}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handlePasswordVisibility={this.handlePasswordVisibility}
            passwordVisibility={passwordVisibility}
            passwordIcon={passwordIcon}
          />

          <BottomContainer>
            <HelpButton onPress={this.goToLogin}>
              <HelpButtonText>Already have an account? </HelpButtonText>
              <BolderHelpButtonText>Log in</BolderHelpButtonText>
            </HelpButton>
          </BottomContainer>
        </ScrollView>
      </Container>
    );
  }
}

Signup.propTypes = {
  initialValues: PropTypes.shape.isRequired,
  addToNewUser: PropTypes.func.isRequired,
};
