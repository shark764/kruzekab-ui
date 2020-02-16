import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Axios from 'axios';
import {
  Container,
  SubHeadline,
  Headline,
  BottomContainer,
  HelpButton,
  HelpButtonText
} from '../../../components/Form/Elements';
import Form from './form';
import { validationSchema } from './validation';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';
// import bcrypt from 'bcrypt';

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
  state = {
    passwordVisibility: true,
    passwordIcon: 'ios-eye'
  };

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      headerTitle: () => null,
      headerLeft: () => (
        <NavigationHeaderButtons>
          <Item
            title="Go Back"
            buttonWrapperStyle={{
              marginLeft: 12,
              marginTop: 10
            }}
            iconName="md-arrow-back"
            onPress={() => navigation.navigate('Initial', { userType: null })}
          />
        </NavigationHeaderButtons>
      ),
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      }
    };
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
      const { phoneNumber, password } = values;

      // const rounds = 10;
      // const hash = await bcrypt.hash(`${phoneNumber}:${password}`, rounds);

      let res = await Axios.post(
        'https://api.kruzekab.com/api/login',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: '$2y$10$Yxl4lSH6PSLvjuNwhNAcS.e8mK8iaU5C52RRfppBscDm8zjuaP5PK'
          }
        }
      );

      console.log(`Status code: ${res.status}`);
      console.log(`Status text: ${res.statusText}`);
      console.log(`Request method: ${res.request.method}`);
      console.log(`Path: ${res.request.path}`);

      console.log(`Date: ${res.headers.date}`);
      console.log(`Data: ${res.data}`);

      if (res.status === 200) {
        this.props.navigation.navigate('Rider', { userType: null });
      } else {
        actions.setFieldError('general', res.statusText);
      }
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Welcome</StyledHeadline>
          <StyledSubHeadline>Login to your Account</StyledSubHeadline>
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
          <BottomContainer>
            <HelpButton onPress={this.goToSignup}>
              <HelpButtonText>Don't have an account? </HelpButtonText>
              <BolderHelpButtonText>Sign Up</BolderHelpButtonText>
            </HelpButton>
          </BottomContainer>
        </ScrollView>
      </Container>
    );
  }
}
