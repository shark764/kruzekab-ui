import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Form from './form';
import { validationSchema } from './validation';
import { Container, Headline, SubHeadline } from '../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../components/Header/HeaderButton';
import { GoBackButton } from '../../../components/Header/Navigator';

const StyledHeadline = styled(Headline)`
  margin-bottom: 0;
`;
const StyledSubHeadline = styled(SubHeadline)`
  margin-bottom: 50px;
`;

export default class ProfilePhoto extends Component {
  state = {
    photo: null
  };

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      headerLeft: () => (
        <GoBackButton onPress={() => navigation.navigate('DriverInformation', { userType: 'driver' })} />
      )
    };
  };

  goToLogin = () => this.props.navigation.navigate('Login', { userType: null });

  goToConfirmation = () => this.props.navigation.navigate('Confirm', { userType: null });

  handleOnSubmit = async (values, actions) => {
    try {
      // const response = await this.props.firebase.signupWithEmail(email, password);

      setTimeout(() => {
        this.props.navigation.navigate('VehicleRegister', { userType: 'driver' });
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
    console.log('Nav param', 'ProfilePhoto', this.props.navigation.getParam('userType', null));

    const { photo } = this.state;

    return (
      <Container enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Headline>Add a profile photo</Headline>
          <SubHeadline>Please add a profile photo so your riders can see who you are</SubHeadline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{}}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </Container>
    );
  }
}
