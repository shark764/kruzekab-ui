import React, { Component, Fragment } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { Button, CheckBox } from 'react-native-elements';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/Form/FormButton';
import ErrorMessage from '../components/Form/ErrorMessage';
// import { withFirebaseHOC } from '../config/Firebase';

// class Signup extends Component {
export default class Signup extends Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  };

  goToLogin = () => this.props.navigation.navigate('Login');

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
    const { name, email, password } = values;

    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      // if (response.user.uid) {
      //   const { uid } = response.user;
      //   const userData = { email, name, uid };
      //   await this.props.firebase.createNewUser(userData);
      //   this.props.navigation.navigate('App');
      // }
      setTimeout(() => {
        this.props.navigation.navigate('App');
        // this.props.navigation.navigate('Login');
      }, 3000);
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
    const { passwordVisibility, confirmPasswordVisibility, passwordIcon, confirmPasswordIcon } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Formik
            initialValues={{
              name: '',
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              // add "check" to initial values
              check: false
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
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Enter your full name"
                  autoCapitalize="none"
                  iconName="md-person"
                  iconColor="#2C384A"
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <FormInput
                  name="username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  placeholder="Enter username"
                  autoCapitalize="none"
                  iconName="md-person"
                  iconColor="#2C384A"
                />
                <ErrorMessage errorValue={touched.username && errors.username} />
                <FormInput
                  name="email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Enter email"
                  autoCapitalize="none"
                  iconName="ios-mail"
                  iconColor="#2C384A"
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name="password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Enter password"
                  secureTextEntry={passwordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={passwordIcon} size={28} color="grey" />
                    </TouchableOpacity>
                  }
                  iconName="ios-lock"
                  iconColor="#2C384A"
                />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <FormInput
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Confirm password"
                  secureTextEntry={confirmPasswordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={this.handleConfirmPasswordVisibility}>
                      <Ionicons name={confirmPasswordIcon} size={28} color="grey" />
                    </TouchableOpacity>
                  }
                  iconName="ios-lock"
                  iconColor="#2C384A"
                />
                <ErrorMessage errorValue={touched.confirmPassword && errors.confirmPassword} />
                <CheckBox
                  containerStyle={styles.checkBoxContainer}
                  checkedIcon="check-box"
                  iconType="material"
                  uncheckedIcon="check-box-outline-blank"
                  title="Agree to terms and conditions"
                  checkedTitle="You agreed to our terms and conditions"
                  checked={values.check}
                  onPress={() => setFieldValue('check', !values.check)}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    onPress={handleSubmit}
                    title="SIGNUP"
                    buttonColor="#F57C00"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </Fragment>
            )}
          </Formik>
          <Button
            title="Have an account? Login"
            onPress={this.goToLogin}
            titleStyle={{
              color: '#039BE5'
            }}
            type="clear"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff'
  }
});

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  username: Yup.string()
    .label('Username')
    .required('Please enter a username')
    .min(4, 'Must have at least 4 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  check: Yup.boolean().oneOf([true], 'Please check the agreement')
});

// export default withFirebaseHOC(Signup);
