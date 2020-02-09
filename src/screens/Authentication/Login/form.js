import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon } from 'react-native-elements';
import styled from 'styled-components';
import FormInput from '../../../components/Form/Fields/FormInput';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer } from '../../../components/Form/Elements';

const StyledButtonContainer = styled(ButtonContainer)`
  margin-right: 15px;
  margin-bottom: 5px;
  align-items: flex-end;
`;

const Form = ({
  handleOnSubmit,
  initialValues,
  validationSchema,
  handlePasswordVisibility,
  passwordVisibility,
  passwordIcon,
  goToForgotPassword
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur }) => (
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

        <FormInput
          name="password"
          label="Password"
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder="password..."
          secureTextEntry={passwordVisibility}
          rightIcon={
            <TouchableOpacity onPress={handlePasswordVisibility}>
              <Icon name={passwordIcon} type="ionicon" size={28} color="grey" />
            </TouchableOpacity>
          }
          iconName="ios-lock"
          iconColor="#2C384A"
          onFocus={() => console.log('Focus triggered!')}
          touched={touched}
          errors={errors}
        />

        <Button
          title="Forgot Password?"
          onPress={goToForgotPassword}
          titleStyle={{
            color: '#5280e2'
          }}
          type="clear"
        />

        <StyledButtonContainer>
          <Icon
            raised
            reverse
            name="arrowright"
            type="antdesign"
            color="#5280e2"
            size={40}
            onPress={handleSubmit}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </StyledButtonContainer>

        {errors.general && <FormattedError errorValue={errors.general} />}
      </Fragment>
    )}
  </Formik>
);

export default Form;
