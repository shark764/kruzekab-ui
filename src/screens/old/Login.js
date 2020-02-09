import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon } from 'react-native-elements';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import styled from 'styled-components';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import WelcomeLogo from '../../../components/Logo/WelcomeLogo';
// import { withFirebaseHOC } from '../config/Firebase';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;
const LogoContainer = styled(HideWithKeyboard)`
  margin-bottom: 15px;
  align-items: center;
`;
const Headline = styled(Text)`
  font-weight: bold;
  font-size: 30px;
  margin-top: 50px;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 25px;
  color: #5280e2;
  font-family: Open Sans;
  font-style: normal;
  letter-spacing: 0.2px;
`;
const SubHeadline = styled(Text)`
  font-weight: normal;
  font-size: 16px;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 50px;
  margin-left: 25px;
  color: #6b768d;
  letter-spacing: 0.2px;
`;
const ButtonContainer = styled(View)`
  margin-top: 25px;
  margin-right: 15px;
  margin-bottom: 5px;
  margin-left: 25px;
  align-items: flex-end;
`;
const LoginSubmit = styled(TouchableOpacity)`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #5280e2;
  border-radius: 50px;
`;

// class Login extends Component {
export default class Login extends Component {
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  };

  goToSignup = () => this.props.navigation.navigate('Signup', { userType: null });

  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword', { userType: null });

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
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

    const { passwordVisibility, rightIcon } = this.state;
    return (
      <Container>
        <Headline>Welcome</Headline>
        <SubHeadline>Login to your Account</SubHeadline>

        <Formik
          initialValues={{
            phoneNumber: '',
            password: ''
          }}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions);
          }}
          validationSchema={validationSchema}>
          {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur }) => (
            <Fragment>
              <FormInput
                name="phoneNumber"
                label="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                placeholder="+1 ([000]) [000] [00] [00]"
                autoCapitalize="none"
                iconName="ios-call"
                iconColor="#2C384A"
                touched={touched}
                errors={errors}
              />

              <FormInput
                name="password"
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="password..."
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
                iconName="ios-lock"
                iconColor="#2C384A"
                onFocus={() => console.log('Focus triggered!')}
                touched={touched}
                errors={errors}
              />

              <Button
                title="Forgot Password?"
                onPress={this.goToForgotPassword}
                titleStyle={{
                  color: '#5280e2'
                }}
                type="clear"
              />

              <ButtonContainer>
                <Icon
                  raised
                  reverse
                  name="arrowright"
                  type="antdesign"
                  color="#5280e2"
                  size={40}
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </ButtonContainer>

              {errors.general && <FormattedError errorValue={errors.general} />}
            </Fragment>
          )}
        </Formik>
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

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .label('Phone Number')
    .required()
    .min(2, 'Must have at least 2 characters'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters')
});

// export default withFirebaseHOC(Login);
