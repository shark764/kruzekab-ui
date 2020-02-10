import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Text, Picker, Image } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon } from 'react-native-elements';
import * as Yup from 'yup';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import FormPicker from '../../../components/Form/Fields/FormPicker';
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

// class VehicleRegister extends Component {
export default class VehicleRegister extends Component {
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
        this.props.navigation.navigate('ApplicationReviewed', { userType: 'driver' });
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
    console.log('Nav param', 'VehicleRegister', this.props.navigation.getParam('userType', null));

    const { passwordVisibility, passwordIcon, photo } = this.state;

    return (
      <Container enabled behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Headline>Vehicle Information</Headline>

          <Formik
            initialValues={{
              car: '',
              model: '',
              vehicleYear: `${new Date().getFullYear()}`,
              maxSeats: '4'
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
                <FormPicker
                  // mode="dropdown"
                  name="car"
                  label="Car"
                  placeholder={{
                    label: 'Choose vehicle branch...',
                    value: '',
                    color: '#9ea0a4'
                  }}
                  selectedValue={values.car}
                  onValueChange={handleChange('car')}
                  onBlur={handleBlur('car')}
                  items={[
                    { label: 'Toyota', value: 'toyota' },
                    { label: 'Honda', value: 'honda' },
                    { label: 'Nissan', value: 'nissan' }
                  ]}
                  useNativeAndroidPickerStyle={false}
                />
                {touched.car && errors.car && <ErrorMessage errorValue={touched.car && errors.car} />}

                <FormPicker
                  // mode="dropdown"
                  name="model"
                  label="Model"
                  // prompt="Choose model model..."
                  placeholder={{
                    label: 'Choose vehicle model...',
                    value: '',
                    color: '#9ea0a4'
                  }}
                  selectedValue={values.model}
                  onValueChange={handleChange('model')}
                  onBlur={handleBlur('model')}
                  items={[
                    { label: 'Corolla', value: 'corolla' },
                    { label: 'Yaris', value: 'yaris' },
                    { label: 'Civic', value: 'civic' },
                    { label: 'Accord', value: 'accord' },
                    { label: 'Sentra', value: 'sentra' },
                    { label: 'Altima', value: 'altima' }
                  ]}
                  useNativeAndroidPickerStyle={false}
                />
                {touched.model && errors.model && <ErrorMessage errorValue={touched.model && errors.model} />}

                <FormInput
                  name="vehicleYear"
                  label="Year"
                  value={values.vehicleYear}
                  onChangeText={handleChange('vehicleYear')}
                  onBlur={handleBlur('vehicleYear')}
                  placeholder="vehicleYear..."
                  autoCapitalize="none"
                  iconName="md-calendar"
                  iconColor="#2C384A"
                  keyboardType="numeric"
                  touched={touched}
                  errors={errors}
                />
                {touched.vehicleYear && errors.vehicleYear && (
                  <ErrorMessage errorValue={touched.vehicleYear && errors.vehicleYear} />
                )}

                <FormInput
                  name="maxSeats"
                  label="Max. Seats"
                  value={values.maxSeats}
                  onChangeText={handleChange('maxSeats')}
                  onBlur={handleBlur('maxSeats')}
                  placeholder="max. seats..."
                  autoCapitalize="none"
                  iconName="md-car"
                  iconColor="#2C384A"
                  keyboardType="numeric"
                  touched={touched}
                  errors={errors}
                />
                {touched.maxSeats && errors.maxSeats && (
                  <ErrorMessage errorValue={touched.maxSeats && errors.maxSeats} />
                )}

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
                  icon={<Icon reverse raised name="add-a-photo" size={15} color="#DDE5F7" reverseColor="#5280e2" />}
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
  car: Yup.string()
    .label('Car')
    .required(),
  model: Yup.string()
    .label('Model')
    .required(),
  vehicleYear: Yup.number()
    .label('Year')
    .typeError('Value must be a number')
    .required()
    .integer('Value can only contain integers')
    .positive('Value must be greater than zero'),
  maxSeats: Yup.number()
    .label('Max. Seats')
    .typeError('Value must be a number')
    .required()
    .integer('Value can only contain integers')
    .positive('Value must be greater than zero')
});

// export default withFirebaseHOC(VehicleRegister);
