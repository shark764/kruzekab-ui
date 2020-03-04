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
          name="name"
          label="Name"
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          placeholder="name..."
          autoCapitalize="words"
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
          autoCapitalize="words"
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

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Next"
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
};

export default Form;
