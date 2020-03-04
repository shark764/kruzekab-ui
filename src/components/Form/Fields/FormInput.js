import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'react-native-elements';
import { View } from 'react-native';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage';

const InputContainer = styled(View)`
  margin-top: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  margin-left: 15px;
`;

export const InputField = ({
  iconName, iconType, iconColor, keyboardType, name, placeholder, ...rest
}) => (
  <InputContainer>
    <Input
      {...rest}
      leftIcon={<Icon name={iconName} type={iconType} size={28} color={iconColor} />}
      leftIconContainerStyle={{
        marginRight: 10,
      }}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      keyboardType={keyboardType}
      labelStyle={{
        lineHeight: 20,
        fontSize: 13,
        fontStyle: 'normal',
        fontFamily: 'Open Sans',
        fontWeight: '600',
        color: '#6b768d',
      }}
      inputStyle={{
        lineHeight: 20,
        fontSize: 13,
        fontStyle: 'normal',
        fontFamily: 'Open Sans',
        fontWeight: 'normal',
        color: '#6b768d',
      }}
    />
  </InputContainer>
);

InputField.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  keyboardType: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  iconType: 'ionicon',
  iconColor: 'black',
  keyboardType: 'default',
};

const FormInput = props => (
  <>
    <InputField {...props} />
    <ErrorMessage {...props} />
  </>
);

export default FormInput;
