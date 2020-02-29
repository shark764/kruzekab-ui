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

export const RadioGroupField = ({
  items = [], name, label, onPress, value,
}) => (
  <Container>
    {label && <Label>{label}</Label>}

    <InputContainer>
      {items.map(item => (
        <CheckBox
          key={item.key}
          title={item.title}
          checkedIcon="check-circle"
          uncheckedIcon="circle-o"
          checkedColor="#5280e2"
          containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
          textStyle={{
            fontSize: 13,
            fontStyle: 'normal',
            fontFamily: 'Open Sans',
            fontWeight: 'normal',
            color: '#6b768d',
          }}
          checked={value === item.key}
          onPress={() => onPress(name, item.key)}
        />
      ))}
    </InputContainer>
  </Container>
);

RadioGroupField.propTypes = {
  items: PropTypes.shape([]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const FormRadioGroup = props => (
  <>
    <RadioGroupField {...props} />
    <ErrorMessage {...props} />
  </>
);

export default FormRadioGroup;
