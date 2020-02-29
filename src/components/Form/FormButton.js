// FormButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const FormButton = ({
  title, buttonType, buttonColor, textColor, ...rest
}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={[
      { borderColor: buttonColor, borderRadius: 4 },
      buttonType !== 'outline' && { backgroundColor: '#5280e2' },
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
      letterSpacing: 0.5,
    }}
  />
);

FormButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default FormButton;
