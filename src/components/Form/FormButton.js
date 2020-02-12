//FormButton.js
import React from 'react';
import { Button, Icon } from 'react-native-elements';

const FormButton = ({ title, buttonType, buttonColor, textColor, ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={[
      { borderColor: buttonColor, borderRadius: 4 },
      buttonType !== 'outline' && { backgroundColor: '#5280e2' }
    ]}
    titleStyle={{
      color: textColor || buttonColor,
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 16,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      letterSpacing: 0.5
    }}
  />
);

export default FormButton;
