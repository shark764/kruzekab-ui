import React, { Component } from 'react';
import { ScrollView, View, Image, StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import {
  ButtonContainer,
  Container,
  Headline,
  BottomContainer,
  HelpButtonText,
  HelpButton
} from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import FormButton from '../../../../components/Form/FormButton';
import Form from './form';
import { validationSchema } from './validation';

const StyledContainer = styled(Container)`
  margin-top: 300px;
`;
const StyledHeadline = styled(Headline)`
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.2px;
  color: #212226;
  margin-bottom: 10px;
`;
const IconContainer = styled(ButtonContainer)`
  margin-bottom: 25px;
  margin-top: 0;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;
const LabelText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b768d;
  justify-content: center;
  align-items: center;
`;
const StyledBottomContainer = styled(BottomContainer)`
  left: 0;
  right: 0;
  margin-left: 25px;
  margin-right: 25px;
`;

export default class RideOnTrip extends Component {
  state = {};

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      title: 'On Trip',
      headerLeft: () => (
        <ExtendedGoBackButton
          iconOnPress={() => navigation.navigate('Riders', { userType: 'rider' })}
          itemOnPress={() => navigation.navigate('Riders', { userType: 'rider' })}
        />
      ),
      headerBackground: () => (
        <Image style={{ width: '100%', height: 450 }} source={require('../../../../assets/map4.png')} />
      )
    };
  };

  componentDidMount() {
    setTimeout(() => {
      this._navigateTo('Streaming', { userType: 'rider' });
    }, 5000);
  }

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  _navigateTo = (destinationScreen, params = {}) => {
    this.props.navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      setTimeout(() => {
        this.props.navigation.navigate('Streaming', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
    }
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('Upload a picture');
        this.setState({ photo: response });
      }
    });
  };

  render() {
    console.log('Nav param', 'RideOnTrip', this.props.navigation.getParam('userType', null));

    const { photo } = this.state;

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              userType: 2,
              name: ''
            }}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}
