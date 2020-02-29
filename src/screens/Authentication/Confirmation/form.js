import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components';
import CodeInput from 'react-native-confirmation-code-field';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { HelpButton, HelpButtonText, BottomButtonContainer } from '../../../components/Form/Elements';

const CodeContainer = styled(View)`
  margin-top: 80px;
  margin-right: 0;
  margin-bottom: 25px;
  margin-left: 0;
`;
const StyledHelpButtonText = styled(HelpButtonText)`
  text-decoration-line: underline;
`;

const Form = ({
  handleOnSubmit,
  initialValues,
  validationSchema,
  handleOnResendCode,
  onFulfill,
  isFulfilled,
  code,
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
    {({ handleSubmit, errors, isSubmitting }) => (
      <>
        <CodeContainer>
          <CodeInput
            ref={code}
            name="code"
            keyboardType="numeric"
            variant="border-b"
            activeColor="#5280e2"
            inactiveColor="#5280e2"
            autoFocus={false}
            ignoreCase={false}
            inputPosition="center"
            space={10}
            size={60}
            codeLength={4}
            onFulfill={onFulfill}
            cellProps={{
              style: {
                fontSize: 40,
                fontWeight: 'bold',
                lineHeight: 30,
                letterSpacing: 8,
              },
            }}
          />
        </CodeContainer>

        <HelpButton onPress={handleOnResendCode}>
          <StyledHelpButtonText>Resend code</StyledHelpButtonText>
        </HelpButton>

        {errors.general && <FormattedError errorValue={errors.general} />}

        <BottomButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Verify"
            textColor="white"
            disabled={!isFulfilled || isSubmitting}
            loading={isSubmitting}
          />
        </BottomButtonContainer>
      </>
    )}
  </Formik>
);

Form.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape.isRequired,
  validationSchema: PropTypes.shape.isRequired,
  code: PropTypes.shape.isRequired,
  handleOnResendCode: PropTypes.func.isRequired,
  onFulfill: PropTypes.func.isRequired,
  isFulfilled: PropTypes.bool.isRequired,
};

export default Form;
