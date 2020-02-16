import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Form from './form';
import { validationSchema } from './validation';
import {
  Headline,
  SubHeadline,
  Container,
  BottomContainer,
  HelpButton,
  HelpButtonText
} from '../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';

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
            useIconComponent={Ionicons}
            iconName="md-arrow-back"
            onPress={() => navigation.navigate('Initial', { userType: 'rider' })}
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

  goToLogin = () => this.props.navigation.navigate('Login', { userType: 'rider' });

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
        this.props.navigation.navigate('Confirm', { userType: 'rider', phoneNumber });
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
    console.log('Nav param', 'Signup', this.props.navigation.getParam('userType', null));

    const { passwordVisibility, passwordIcon } = this.state;
    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Sign Up</StyledHeadline>
          <StyledSubHeadline>You will receive a SMS verification code</StyledSubHeadline>
          <Form
            handleOnSubmit={this.handleOnSignup}
            initialValues={{
              userType: 1,
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
