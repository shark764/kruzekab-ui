import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components';
import Form from './form';
import validationSchema from './validation';
import { Container } from '../../../components/Form/Elements';
import { GoBackButton } from '../../../components/Header/Navigator';
import { createClient } from '../../../redux/requests';

const HeadlineContainer = styled(View)`
  margin-top: 120px;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
`;
const Headline = styled(Text)`
  text-align: center;
  font-weight: normal;
  font-size: 16px;
  color: #6b768d;
  letter-spacing: 0.2px;
`;

export default class Confirmation extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => <GoBackButton onPress={() => navigation.navigate('Signup')} />,
  });

  code = createRef();

  constructor(props) {
    super(props);

    this.state = {
      isFulfilled: false,
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handlerOnFulfill = code => {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code === '1234') {
      Alert.alert('Confirmation Code', 'Successful!', [{ text: 'OK' }], { cancelable: false });
      this.setState(() => ({
        isFulfilled: true,
      }));
    } else {
      Alert.alert('Confirmation Code', 'Code not match!', [{ text: 'OK' }], { cancelable: false });
      this.setState(() => ({
        isFulfilled: false,
      }));

      // this.code.current.clear();
    }
  };

  handleVerify = async (values, actions) => {
    try {
      const { navigation } = this.props;
      const userType = navigation.getParam('userType', null);

      if (!userType) {
        this.navigateTo('Initial', { error: 'Could not identify user type' });
      }
      if (userType === 'rider') {
        await createClient();
        this.navigateTo('Login', { userType });
      } else {
        this.navigateTo('DriverInformation', { userType });
      }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleOnResendCode = async () => {
    try {
      setTimeout(() => {
        console.log('Code sent again');
      }, 1500);
    } catch (error) {
      // Error
    }
  };

  render() {
    const { phoneNumber, initialValues } = this.props;
    const { isFulfilled } = this.state;

    return (
      <Container>
        <HeadlineContainer>
          <Headline>A code has been sent to</Headline>
          <Headline>
            {phoneNumber}
            {' '}
            via SMS
          </Headline>
        </HeadlineContainer>
        <Form
          phoneNumber={phoneNumber}
          handleOnSubmit={this.handleVerify}
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleOnResendCode={this.handleOnResendCode}
          onFulfill={this.handlerOnFulfill}
          isFulfilled={isFulfilled}
          code={this.code}
        />
      </Container>
    );
  }
}

Confirmation.propTypes = {
  initialValues: PropTypes.shape.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
