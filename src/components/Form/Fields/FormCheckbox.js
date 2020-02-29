import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage';

const Container = styled(View)`
  margin-top: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  margin-left: 15px;
  padding-horizontal: 10px;
`;
const InputContainer = styled(View)`
  flex-direction: row;
`;
const Label = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #6b768d;
  margin-bottom: 5px;
`;

export const CheckboxField = ({ label, ...rest }) => (
  <Container>
    {label && <Label>{label}</Label>}

    <InputContainer>
      <CheckBox
        {...rest}
        containerStyle={{
          backgroundColor: '#fff',
          borderColor: '#fff',
        }}
        checkedIcon="check-square"
        checkedColor="#5280e2"
        textStyle={{
          fontSize: 13,
          fontStyle: 'normal',
          fontFamily: 'Open Sans',
          fontWeight: 'normal',
          color: '#6b768d',
        }}
      />
    </InputContainer>
  </Container>
);

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
};

const FormCheckbox = props => (
  <>
    <CheckboxField {...props} />
    <ErrorMessage {...props} />
  </>
);

export default FormCheckbox;
