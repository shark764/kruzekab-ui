import React, { Fragment } from 'react';
import { Formik } from 'formik';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer } from '../../../components/Form/Elements';

const Form = ({ handleOnSubmit, initialValues, validationSchema }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleChange, values, handleSubmit, errors, isValid, touched, handleBlur, isSubmitting }) => (
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

        {/* <FormInput
          name="email"
          value={values.email}
          onChangeText={handleChange('email')}
          placeholder="example@domain.com"
          autoCapitalize="none"
          iconName="ios-mail"
          iconColor="#2C384A"
          onBlur={handleBlur('email')}
          touched={touched}
          errors={errors}
        /> */}

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
);

export default Form;
