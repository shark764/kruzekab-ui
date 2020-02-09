import React, { Component, Fragment, createRef } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Button, Icon } from 'react-native-elements';
// import CodeInput from 'react-native-confirmation-code-input';
import CodeInput from 'react-native-confirmation-code-field';
import FormInput from '../../../components/Form/Fields/FormInput';
import FormButton from '../../../components/Form/FormButton';
import { FormattedError } from '../../../components/Form/ErrorMessage';
// import { withFirebaseHOC } from '../config/Firebase';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  ${'' /* margin-top: 150px; */}
`;
const Title = styled(Text)`
  color: #333;
  font-size: 24px;
  margin-left: 25px;
`;
const ButtonContainer = styled(View)`
  margin-top: 80px;
  margin-right: 25px;
  margin-bottom: 25px;
  margin-left: 25px;
`;
const HeadlineContainer = styled(View)`
  margin-top: 150px;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
`;
const Headline = styled(Text)`
  text-align: center;
  font-weight: normal;
  font-size: 16px;
  color: #a8b4cd;
  letter-spacing: 0.2px;
`;
const CodeContainer = styled(View)`
  margin-top: 80px;
  margin-right: 0;
  margin-bottom: 12px;
  margin-left: 0;
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

  handlerOnFulfill = code => {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code == '1234') {
      Alert.alert('Confirmation Code', 'Successful!', [{ text: 'OK' }], { cancelable: false });
      this.setState(prevState => ({
        isFulfilled: true
      }));
    } else {
      Alert.alert('Confirmation Code', 'Code not match!', [{ text: 'OK' }], { cancelable: false });
      this.setState(prevState => ({
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
        <Formik
          initialValues={{ code: '' }}
          onSubmit={(values, actions) => {
            this.handleVerify(values, actions);
          }}
          // validationSchema={validationSchema}
        >
          {({ handleChange, values, handleSubmit, errors, isValid, touched, handleBlur, isSubmitting }) => (
            <Fragment>
              <CodeContainer>
                <CodeInput
                  ref={this.code}
                  name="code"
                  keyboardType="numeric"
                  variant="border-b"
                  // className="border-circle"
                  activeColor="#5280e2"
                  inactiveColor="#5280e2"
                  autoFocus={false}
                  ignoreCase={false}
                  inputPosition="center"
                  space={10}
                  size={60}
                  codeLength={4}
                  // onFulfill={code => this._onFulfill(code)}
                  onFulfill={this.handlerOnFulfill}
                  cellProps={{
                    style: {
                      // color: '#fff',
                      // backgroundColor: '#030c31',
                      fontSize: 30,
                      fontWeight: '900',
                      // textShadow: '1px 0 #888888',
                      // textShadowColor: '#5280e2',
                      // textShadowOffset: { width: -1, height: 1 },
                      // textShadowRadius: 0,
                      letterSpacing: 1
                      // fontFamily: 'Impact'
                    }
                  }}
                />
              </CodeContainer>

              <Button
                title="Resend code"
                onPress={() => console.log('Code sent!')}
                titleStyle={{
                  color: '#5280e2',
                  textDecorationLine: 'underline'
                }}
                type="clear"
              />

              <ButtonContainer>
                <FormButton
                  onPress={handleSubmit}
                  title="Verify"
                  textColor="white"
                  disabled={!this.state.isFulfilled || isSubmitting}
                  loading={isSubmitting}
                />
              </ButtonContainer>

              {errors.general && <FormattedError errorValue={errors.general} />}
            </Fragment>
          )}
        </Formik>
      </Container>
    );
  }
}

const validationSchema = Yup.object().shape({});

// export default withFirebaseHOC(Confirmation);
