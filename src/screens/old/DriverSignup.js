import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon } from 'react-native-elements';

// import PhoneInput from 'react-native-phone-input';
// import TextInputMask from 'react-native-text-input-mask';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import styled from 'styled-components';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
// import { withFirebaseHOC } from '../config/Firebase';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: #fff;
  ${'' /* margin-top: 50px; */}
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
  margin-bottom: 25px;
  margin-left: 25px;
  color: #6b768d;
  letter-spacing: 0.2px;
`;
const ButtonContainer = styled(View)`
  margin-top: 25px;
  margin-right: 25px;
  margin-bottom: 25px;
  margin-left: 25px;
`;

// class DriverSignup extends Component {
export default class DriverSignup extends Component {
  state = {
    passwordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: 'driver' });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: 'driver' });

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
        // this.props.navigation.navigate('VehicleRegister', { userType: null });
        this.props.navigation.navigate('Confirm', { userType: 'driver', phoneNumber });
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
    console.log('Nav param', 'DriverSignup', this.props.navigation.getParam('userType', null));

    const { passwordVisibility, passwordIcon } = this.state;
    return (
      <Container enabled behavior="padding">
        <ScrollView>
          <Headline>Become a Driver</Headline>
          <SubHeadline>Sign up to start your application process</SubHeadline>
          <Formik
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
            onSubmit={(values, actions) => {
              console.log('values =>', values);
              this.handleOnSignup(values, actions);
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              isSubmitting,
              touched,
              handleBlur,
              setFieldValue
            }) => (
              <Fragment>
                <FormInput
                  name="name"
                  label="Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="name..."
                  autoCapitalize="none"
                  iconName="md-person"
                  iconColor="#2C384A"
                  touched={touched}
                  errors={errors}
                />

                <FormInput
                  name="lastName"
                  label="Last name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="lastName..."
                  autoCapitalize="none"
                  iconName="md-person"
                  iconColor="#2C384A"
                  touched={touched}
                  errors={errors}
                />

                <FormInput
                  name="email"
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="example@domain.com"
                  autoCapitalize="none"
                  iconName="ios-mail"
                  iconColor="#2C384A"
                  touched={touched}
                  errors={errors}
                />

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
                  name="occupation"
                  label="Primary Occupation"
                  value={values.occupation}
                  onChangeText={handleChange('occupation')}
                  onBlur={handleBlur('occupation')}
                  placeholder="primary occupation..."
                  autoCapitalize="none"
                  iconType="material-community"
                  iconName="worker"
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
                      <Icon name={passwordIcon} type="ionicon" size={28} color="grey" />
                    </TouchableOpacity>
                  }
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  touched={touched}
                  errors={errors}
                />

                <ButtonContainer>
                  <FormButton
                    onPress={handleSubmit}
                    title="Next"
                    textColor="white"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </ButtonContainer>

                {errors.general && <FormattedError errorValue={errors.general} />}
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </Container>
    );
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  phoneNumber: Yup.string()
    .label('Phone Number')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters')
});

// export default withFirebaseHOC(DriverSignup);
