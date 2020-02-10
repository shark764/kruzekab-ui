import React, { Component } from 'react';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Form from './form';
import { validationSchema } from './validation';
import { Container, Title } from '../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';

export default class ForgotPassword extends Component {
  state = {
    confirmationSent: false
  };

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      headerTitle: () => null,
      headerLeft: () => (
        <NavigationHeaderButtons>
          <Item
            key="go-back"
            buttonWrapperStyle={{
              marginLeft: 12,
              marginTop: 10
            }}
            useIconComponent={Ionicons}
            iconName="md-arrow-back"
            onPress={() => navigation.navigate('DriverInformation', { userType: 'driver' })}
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

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToSignup = () => this.props.navigation.navigate('Signup', { userType: null });

  handlePasswordReset = async (values, actions) => {
    try {
      // await this.props.firebase.passwordReset(email);
      console.log('Password reset email sent successfully');
      this.props.navigation.navigate('Login', { userType: null });
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  render() {
    console.log('Nav param', 'ForgotPassword', this.props.navigation.getParam('userType', null));

    return (
      <Container>
        <Title>Forgot Password?</Title>

        <Form
          handleOnSubmit={this.handlePasswordReset}
          initialValues={{
            phoneNumber: '',
            email: ''
          }}
          validationSchema={validationSchema}
          handleChoosePhoto={this.handleChoosePhoto}
          goToLogin={this.goToLogin}
          goToSignup={this.goToSignup}
        />
      </Container>
    );
  }
}
