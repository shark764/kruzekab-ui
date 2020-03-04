import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import FormButton from '../../../../../components/Form/FormButton';
import { FormattedError } from '../../../../../components/Form/ErrorMessage';
import { BottomButtonContainer } from '../../../../../components/Form/Elements';
import FormInput from '../../../../../components/Form/Fields/FormInput';

const Form = ({ handleOnSubmit, initialValues, validationSchema }) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}
  >
    {({
      handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur,
    }) => (
      <>
        <FormInput
          name="parentPhoneNumber"
          label="Parent's Phone Number"
          value={values.parentPhoneNumber}
          onChangeText={handleChange('parentPhoneNumber')}
          onBlur={handleBlur('parentPhoneNumber')}
          placeholder="+1 ([000]) [000] [00] [00]"
          autoCapitalize="none"
          iconName="ios-call"
          iconColor="#2C384A"
          touched={touched}
          errors={errors}
        />

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Continue"
            textColor="white"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </BottomButtonContainer>
      </>
    )}
  </Formik>
);

Form.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
};

export default Form;
