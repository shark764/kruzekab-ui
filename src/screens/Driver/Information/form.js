import React, { Fragment } from 'react';
import { Image } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import FormRadioGroup from '../../../components/Form/Fields/FormRadioGroup';
import FormCheckbox from '../../../components/Form/Fields/FormCheckbox';
import { ButtonContainer } from '../../../components/Form/Elements';

const Form = ({ handleOnSubmit, initialValues, validationSchema, handleChoosePhoto, photo }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue }) => (
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
          onPress={handleChoosePhoto}
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
          name="check"
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
);

export default Form;
