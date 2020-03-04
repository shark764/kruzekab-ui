import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import {
  Container,
  SubHeadline,
  Headline,
  BottomContainer,
  HelpButton,
  HelpButtonText,
} from '../../../components/Form/Elements';
import Form from './form';
import validationSchema from './validation';
import { GoBackButton } from '../../../components/Header/Navigator';
import { loginRequest } from '../../../redux/requests';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;
const StyledSubHeadline = styled(SubHeadline)`
  margin-bottom: 45px;
`;
const BolderHelpButtonText = styled(HelpButtonText)`
  font-weight: bold;
`;

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Initial', { userType: null })} />,
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

  goToSignup = () => this.navigateTo('Signup', { userType: 'rider' });

  goToForgotPassword = () => this.navigateTo('ForgotPassword', { userType: 'rider' });

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility,
    }));
  };

  handleOnLogin = async (values, actions) => {
    console.log('TONCES?');

    try {
      const { navigation, login } = this.props;
      let userType = navigation.getParam('userType', null);
      const { phoneNumber, password } = values;
      const { data } = await loginRequest(phoneNumber, password);
      if (data.data.user.client !== null) {
        userType = 'rider';
      } else if (data.data.user.driver !== null) {
        userType = 'driver';
      }
      login(userType, data.data.user);

      if (userType === 'rider') {
        // This is avoiding submit button loading icon
        actions.setSubmitting(false);

        this.navigateTo('Rider', { userType });
      } else {
        // This is avoiding submit button loading icon
        actions.setSubmitting(false);

        this.navigateTo('ApplicationReviewed', { userType });
      }
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
      <Container>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Welcome</StyledHeadline>
          <StyledSubHeadline>Login to your Account</StyledSubHeadline>
          <Form
            handleOnSubmit={this.handleOnLogin}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handlePasswordVisibility={this.handlePasswordVisibility}
            passwordVisibility={passwordVisibility}
            passwordIcon={passwordIcon}
            goToForgotPassword={this.goToForgotPassword}
          />
          <BottomContainer>
            <HelpButton onPress={this.goToSignup}>
              <HelpButtonText>Don&apos;t have an account? </HelpButtonText>
              <BolderHelpButtonText>Sign Up</BolderHelpButtonText>
            </HelpButton>
          </BottomContainer>
        </ScrollView>
      </Container>
    );
  }
}

Login.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
};
