import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Text, Picker, Image } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon, CheckBox } from 'react-native-elements';
import * as Yup from 'yup';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RadioGroup from 'react-native-radio-buttons-group';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import FormPicker from '../../../components/Form/Fields/FormPicker';
import FormRadioGroup from '../../../components/Form/Fields/FormRadioGroup';
import FormCheckbox from '../../../components/Form/Fields/FormCheckbox';
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
  margin-bottom: 25px;
  margin-left: 25px;
  color: #5280e2;
  font-family: Open Sans;
  font-style: normal;
  letter-spacing: 0.2px;
`;
const ButtonContainer = styled(View)`
  margin-top: 25px;
  margin-right: 25px;
  margin-bottom: 25px;
  margin-left: 25px;
`;
const Label = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #6b768d;
`;

// class DriverInformation extends Component {
export default class DriverInformation extends Component {
  state = {
    passwordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye',
    photo: null
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleOnSignup = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      // if (response.user.uid) {
      //   const { uid } = response.user;
      //   const userData = { email, name, uid };
      //   await this.props.firebase.createNewUser(userData);
      //   this.props.navigation.navigate('App', { userType: null });
      // }
      setTimeout(() => {
        this.props.navigation.navigate('ProfilePhoto', { userType: 'driver' });
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

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('Upload a picture');
        this.setState({ photo: response });
      }
    });
  };

  render() {
    console.log('Nav param', 'DriverInformation', this.props.navigation.getParam('userType', null));

    const { passwordVisibility, passwordIcon, photo } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Headline>Driver Information</Headline>

          <Formik
            initialValues={{
              gender: 'male',
              birthdate: '',
              licenseNumber: '',
              trafficViolation: 'no',
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
                  name="birthdate"
                  label="Birth Date"
                  value={values.birthdate}
                  onChangeText={handleChange('birthdate')}
                  onBlur={handleBlur('birthdate')}
                  placeholder="dd/mm/yyyy"
                  autoCapitalize="none"
                  iconName="md-calendar"
                  iconColor="#2C384A"
                  touched={touched}
                  errors={errors}
                />

                <FormRadioGroup
                  name="gender"
                  label="Gender"
                  items={[
                    { title: 'Male', key: 'male' },
                    { title: 'Female', key: 'female' }
                  ]}
                  value={values.gender}
                  onPress={setFieldValue}
                  touched={touched}
                  errors={errors}
                />

                <FormInput
                  name="licenseNumber"
                  label="Driver License Number"
                  value={values.licenseNumber}
                  onChangeText={handleChange('licenseNumber')}
                  onBlur={handleBlur('licenseNumber')}
                  placeholder="00000000"
                  autoCapitalize="none"
                  iconType="font-awesome"
                  iconName="drivers-license-o"
                  iconColor="#2C384A"
                  keyboardType="numeric"
                  touched={touched}
                  errors={errors}
                />

                {photo && <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />}
                <Button
                  title="Upload proof of car insurance"
                  onPress={this.handleChoosePhoto}
                  titleStyle={{
                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: 14,
                    color: '#5280e2'
                  }}
                  type="clear"
                  icon={<Icon reverse raised name="add-a-photo" size={15} color="#dde5f7" reverseColor="#5280e2" />}
                />

                <FormRadioGroup
                  name="trafficViolation"
                  label="Have you had a traffic violation in the last year"
                  items={[
                    { title: 'Yes', key: 'yes' },
                    { title: 'No', key: 'no' }
                  ]}
                  value={values.trafficViolation}
                  onPress={setFieldValue}
                  touched={touched}
                  errors={errors}
                />

                <FormCheckbox
                  label="Background Check"
                  containerStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#fff'
                  }}
                  title="I agree to a background check and a driving record check"
                  checked={values.check}
                  onPress={() => setFieldValue('check', !values.check)}
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
  check: Yup.boolean().oneOf([true], 'Please check the agreement')
  // gender: Yup.boolean().oneOf(['male', 'female'], 'Please choose a value')
});

// export default withFirebaseHOC(DriverInformation);
