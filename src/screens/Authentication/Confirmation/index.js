import React, { Component, createRef } from 'react';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Form from './form';
import { validationSchema } from './validation';
import { Container } from '../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';

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
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      confirmationSent: false,
      isFulfilled: false
    };
  }

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      headerTitle: () => null,
      headerLeft: () => (
        <NavigationHeaderButtons>
          <Item
            title="Go Back"
            buttonWrapperStyle={{
              marginLeft: 12,
              marginTop: 10
            }}
            useIconComponent={Ionicons}
            iconName="md-arrow-back"
            onPress={() => navigation.navigate('Signup')}
          />
        </NavigationHeaderButtons>
      ),
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      }
    };
  };

  handlerOnFulfill = code => {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code == '1234') {
      Alert.alert('Confirmation Code', 'Successful!', [{ text: 'OK' }], { cancelable: false });
      this.setState(() => ({
        isFulfilled: true
      }));
    } else {
      Alert.alert('Confirmation Code', 'Code not match!', [{ text: 'OK' }], { cancelable: false });
      this.setState(() => ({
        isFulfilled: false
      }));

      // this.code.current.clear();
    }
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToSignup = () => this.props.navigation.navigate('Signup', { userType: null });

  handleVerify = async (values, actions) => {
    // const { email } = values;

    try {
      // await this.props.firebase.passwordReset(email);

      setTimeout(() => {
        const userType = this.props.navigation.getParam('userType', null);
        console.log('Verified successfully', userType, userType === 'rider');
        if (!userType) {
          this.props.navigation.navigate('Initial', { error: 'Could not identify user type' });
        }
        if (userType === 'rider') {
          this.props.navigation.navigate('App', { userType: userType });
        } else {
          this.props.navigation.navigate('DriverInformation', { userType: userType });
        }
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  handleOnResendCode = async () => {
    try {
      setTimeout(() => {
        console.log('Code sent again');
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  code = createRef();

  render() {
    console.log(
      'Nav param',
      'Confirmation',
      this.props.navigation.getParam('userType', null),
      this.props.navigation.getParam('phoneNumber', null)
    );
    const phoneNumber = this.props.navigation.getParam('phoneNumber', null);

    return (
      <Container>
        <HeadlineContainer>
          <Headline>A code has been sent to</Headline>
          <Headline>{phoneNumber} via SMS</Headline>
        </HeadlineContainer>
        <Form
          phoneNumber={phoneNumber}
          handleOnSubmit={this.handleVerify}
          initialValues={{ code: '' }}
          validationSchema={validationSchema}
          handleOnResendCode={this.handleOnResendCode}
          onFulfill={this.handlerOnFulfill}
          isFulfilled={this.state.isFulfilled}
          code={this.code}
          goToLogin={this.goToLogin}
          goToSignup={this.goToSignup}
        />
      </Container>
    );
  }
}
