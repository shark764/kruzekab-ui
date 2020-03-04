import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
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
  border-bottom-width: 1px;
  border-color: #86939e;
`;
const Label = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #6b768d;
`;

export const PickerField = ({
  items,
  iconName,
  iconType,
  iconColor,
  keyboardType,
  name,
  placeholder,
  label,
  ...rest
}) => (
  <Container>
    {label && <Label>{label}</Label>}
    <InputContainer>
      <RNPickerSelect
        {...rest}
        placeholderTextColor="grey"
        name={name}
        placeholder={placeholder}
        items={items}
        textInputProps={{ underlineColor: 'gray' }}
        Icon={() => <Icon name={iconName} type={iconType} size={20} color={iconColor} />}
        style={{
          inputIOS: {
            paddingHorizontal: 25,
            paddingVertical: 8,
            paddingRight: 30, // to ensure the text is never behind the icon
            lineHeight: 20,
            fontSize: 13,
            fontStyle: 'normal',
            fontFamily: 'Open Sans',
            fontWeight: 'normal',
            color: '#6b768d',
          },
          inputAndroid: {
            paddingHorizontal: 25,
            paddingVertical: 8,
            paddingRight: 30, // to ensure the text is never behind the icon
            lineHeight: 20,
            fontSize: 13,
            fontStyle: 'normal',
            fontFamily: 'Open Sans',
            fontWeight: 'normal',
            color: '#6b768d',
          },
          iconContainer: {
            top: 10,
            right: 10,
          },
        }}
      />
    </InputContainer>
  </Container>
);

PickerField.propTypes = {
  items: PropTypes.shape([]),
  iconName: PropTypes.string,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  keyboardType: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

PickerField.defaultProps = {
  items: [],
  iconName: 'ios-arrow-down',
  iconType: 'ionicon',
  iconColor: '#5280e2',
  keyboardType: 'default',
};

const FormPicker = props => (
  <>
    <PickerField {...props} />
    <ErrorMessage {...props} />
  </>
);

export default FormPicker;
