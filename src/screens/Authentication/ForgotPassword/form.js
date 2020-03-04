import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Icon } from 'react-native-elements';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { BottomButtonContainer } from '../../../components/Form/Elements';

const Form = ({
  handleOnSubmit,
  initialValues,
  validationSchema,
  handlePasswordVisibility,
  passwordVisibility,
  passwordIcon,
  handleConfirmPasswordVisibility,
  confirmPasswordVisibility,
  confirmPasswordIcon,
}) => (
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
          name="newPassword"
          label="New Password"
          value={values.newPassword}
          onChangeText={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          placeholder="new password..."
          secureTextEntry={passwordVisibility}
          rightIcon={(
            <TouchableOpacity onPress={handlePasswordVisibility}>
              <Icon name={passwordIcon} type="ionicon" size={28} color="grey" />
            </TouchableOpacity>
          )}
          iconName="ios-lock"
          iconColor="#2C384A"
          touched={touched}
          errors={errors}
        />

        <FormInput
          name="confirmNewPassword"
          label="Confirm New Password"
          value={values.confirmNewPassword}
          onChangeText={handleChange('confirmNewPassword')}
          onBlur={handleBlur('confirmNewPassword')}
          placeholder="confirm new password..."
          secureTextEntry={confirmPasswordVisibility}
          rightIcon={(
            <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
              <Icon name={confirmPasswordIcon} type="ionicon" size={28} color="grey" />
            </TouchableOpacity>
          )}
          iconName="ios-lock"
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
  handlePasswordVisibility: PropTypes.func.isRequired,
  passwordVisibility: PropTypes.bool.isRequired,
  passwordIcon: PropTypes.string.isRequired,
  handleConfirmPasswordVisibility: PropTypes.func.isRequired,
  confirmPasswordVisibility: PropTypes.bool.isRequired,
  confirmPasswordIcon: PropTypes.string.isRequired,
};

export default Form;
