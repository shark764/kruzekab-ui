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
    titleStyle={{ color: textColor || buttonColor }}
  />
);

export default FormButton;
