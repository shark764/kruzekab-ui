import React, { Fragment } from 'react';
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
  iconName,
  iconType = 'ionicon',
  iconColor = 'black',
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <InputContainer>
    <Input
      {...rest}
      leftIcon={<Icon name={iconName} type={iconType} size={28} color={iconColor} />}
      leftIconContainerStyle={{
        marginRight: 10
      }}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      labelStyle={{
        lineHeight: 20,
        fontSize: 13,
        fontStyle: 'normal',
        fontFamily: 'Open Sans',
        fontWeight: '600',
        color: '#6b768d'
      }}
      inputStyle={{
        lineHeight: 20,
        fontSize: 13,
        fontStyle: 'normal',
        fontFamily: 'Open Sans',
        fontWeight: 'normal',
        color: '#6b768d'
      }}
    />
  </InputContainer>
);

const FormInput = props => (
  <Fragment>
    <InputField {...props} />
    <ErrorMessage {...props} />
  </Fragment>
);

export default FormInput;
