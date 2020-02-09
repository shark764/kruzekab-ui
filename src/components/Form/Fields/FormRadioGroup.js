import React, { Fragment } from 'react';
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
  items = [],
  iconName = 'ios-arrow-down',
  iconType = 'ionicon',
  iconColor = '#5280e2',
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  label,
  setFieldValue,
  checked,
  onPress,
  value
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
            color: '#6b768d'
          }}
          checked={value === item.key}
          onPress={() => onPress(name, item.key)}
        />
      ))}
    </InputContainer>
  </Container>
);

const FormRadioGroup = props => (
  <Fragment>
    <RadioGroupField {...props} />
    <ErrorMessage {...props} />
  </Fragment>
);

export default FormRadioGroup;
