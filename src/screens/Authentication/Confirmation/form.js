import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components';
import CodeInput from 'react-native-confirmation-code-field';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
import { ButtonContainer } from '../../../components/Form/Elements';
import { Button } from 'react-native-elements';

const CodeContainer = styled(View)`
  margin-top: 80px;
  margin-right: 0;
  margin-bottom: 12px;
  margin-left: 0;
`;
const StyledButtonContainer = styled(ButtonContainer)`
  margin-top: 80px;
`;

const Form = ({
  handleOnSubmit,
  initialValues,
  validationSchema,
  handleOnResendCode,
  onFulfill,
  isFulfilled,
  code
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, actions) => {
      console.log('values =>', values);
      handleOnSubmit(values, actions);
    }}
    validationSchema={validationSchema}>
    {({ handleSubmit, errors, isSubmitting }) => (
      <Fragment>
        <CodeContainer>
          <CodeInput
            ref={code}
            name="code"
            keyboardType="numeric"
            variant="border-b"
            // className="border-circle"
            activeColor="#5280e2"
            inactiveColor="#5280e2"
            autoFocus={false}
            ignoreCase={false}
            inputPosition="center"
            space={10}
            size={60}
            codeLength={4}
            // onFulfill={code => this._onFulfill(code)}
            onFulfill={onFulfill}
            cellProps={{
              style: {
                // color: '#fff',
                // backgroundColor: '#030c31',
                fontSize: 30,
                fontWeight: '900',
                // textShadow: '1px 0 #888888',
                // textShadowColor: '#5280e2',
                // textShadowOffset: { width: -1, height: 1 },
                // textShadowRadius: 0,
                letterSpacing: 1
                // fontFamily: 'Impact'
              }
            }}
          />
        </CodeContainer>

        <Button
          title="Resend code"
          onPress={handleOnResendCode}
          titleStyle={{
            color: '#5280e2',
            textDecorationLine: 'underline'
          }}
          type="clear"
        />

        <StyledButtonContainer>
          <FormButton
            onPress={handleSubmit}
            title="Verify"
            textColor="white"
            disabled={!isFulfilled || isSubmitting}
            loading={isSubmitting}
          />
        </StyledButtonContainer>

        {errors.general && <FormattedError errorValue={errors.general} />}
      </Fragment>
    )}
  </Formik>
);

export default Form;
