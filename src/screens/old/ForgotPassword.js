import React, { Component, Fragment } from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import CodeInput from 'react-native-confirmation-code-input';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
// import { withFirebaseHOC } from '../config/Firebase';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  margin-top: 150px;
`;
const Title = styled(Text)`
  color: #333;
  font-size: 24px;
  margin-left: 25px;
`;
const ButtonContainer = styled(View)`
  margin-top: 25px;
  margin-right: 25px;
  margin-bottom: 25px;
  margin-left: 25px;
`;

export default class ForgotPassword extends Component {
  state = {
    confirmationSent: false
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToSignup = () => this.props.navigation.navigate('Signup', { userType: null });

  handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      // await this.props.firebase.passwordReset(email);
      console.log('Password reset email sent successfully');
      this.props.navigation.navigate('Login', { userType: null });
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  render() {
    console.log('Nav param', 'ForgotPassword', this.props.navigation.getParam('userType', null));

    return (
      <Container>
        <Title>Forgot Password?</Title>
        <Formik
          initialValues={{ phoneNumber: '', email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions);
          }}
          validationSchema={validationSchema}>
          {({ handleChange, values, handleSubmit, errors, isValid, touched, handleBlur, isSubmitting }) => (
            <Fragment>
              <FormInput
                name="code"
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

              {/* <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="example@domain.com"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} /> */}

              <ButtonContainer>
                <FormButton
                  onPress={handleSubmit}
                  title="Send SMS"
                  textColor="white"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </ButtonContainer>
              {errors.general && <FormattedError errorValue={errors.general} />}
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .label('Phone Number')
    .required()
    .min(2, 'Must have at least 2 characters')
  // email: Yup.string()
  //   .label('Email')
  //   .email('Enter a valid email')
  //   .required('Please enter a registered email')
});

// export default withFirebaseHOC(ForgotPassword);
