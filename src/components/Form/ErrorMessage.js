import React from 'react';
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

const ErrorMessage = ({ name, errors, touched }) =>
  touched[name] && errors[name] ? <FormattedError errorValue={touched[name] && errors[name]} /> : null;

export default ErrorMessage;
