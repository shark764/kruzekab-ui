import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  margin-left: 25px;
`;
const ErrorText = styled(Text)`
  color: red;
`;

export const FormattedError = ({ errorValue }) => (
  <Container>
    <ErrorText>{errorValue}</ErrorText>
  </Container>
);

FormattedError.propTypes = {
  errorValue: PropTypes.string.isRequired,
};

const ErrorMessage = ({ name, errors, touched }) => {
  if (touched[name] && errors[name]) {
    return <FormattedError errorValue={touched[name] && errors[name]} />;
  }
  return null;
};

ErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.shape([]).isRequired,
  touched: PropTypes.shape([]).isRequired,
};

export default ErrorMessage;
