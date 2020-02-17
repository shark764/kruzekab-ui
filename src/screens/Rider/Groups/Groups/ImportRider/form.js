import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import { Button, Icon, Avatar, CheckBox } from 'react-native-elements';
import styled from 'styled-components';
import FormButton from '../../../../../components/Form/FormButton';
import ErrorMessage, { FormattedError } from '../../../../../components/Form/ErrorMessage';
import {
  ButtonContainer,
  BottomContainer,
  Headline,
  BottomButtonContainer
} from '../../../../../components/Form/Elements';
import FormInput from '../../../../../components/Form/Fields/FormInput';
import FormCheckbox from '../../../../../components/Form/Fields/FormCheckbox';

const StyledHeadline = styled(Headline)`
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.2px;
  color: #212226;
  margin-bottom: 10px;
`;
const IconContainer = styled(ButtonContainer)`
  margin-top: -6px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;
const RiderContainer = styled(IconContainer)`
  margin-top: 0;
  margin-left: 25px;
  margin-bottom: 15px;
`;
const LabelText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b768d;
  justify-content: center;
  align-items: center;
`;
const DeleteLabelText = styled(Text)`
  color: #ee0000;
`;
const StyledBottomContainer = styled(BottomContainer)`
  left: 0;
  right: 0;
  margin-left: 25px;
  margin-right: 25px;
`;
const DeleteContainer = styled(View)`
  margin-left: 25px;
  flex-direction: row;
  justify-content: flex-start;
`;
const FieldContainer = styled(View)`
  margin-right: 15px;
  margin-left: 15px;
`;

const Form = ({ handleOnSubmit, initialValues, validationSchema }) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue }) => (
      <Fragment>
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
      </Fragment>
    )}
  </Formik>
);

export default Form;
