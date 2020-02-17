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
} from '../../../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../../../components/Header/HeaderButton';
import FormButton from '../../../../../components/Form/FormButton';
import Form from './form';
import { validationSchema } from './validation';

const StyledContainer = styled(Container)`
  margin-top: 30px;
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

export default class EditGroup extends Component {
  state = {
    ridersList: []
  };

  static navigationOptions = ({        navigation, navigation: { state } }) => {
    return {
      title: 'Edit group',
      headerLeft: () => (
        <NavigationHeaderButtons>
          <Item
            title="Go Back"
            buttonWrapperStyle={{
              marginLeft: 12,
              marginTop: 30,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}
            ButtonElement={
              <Icon
                raised
                reverse
                type="ionicon"
                name="ios-arrow-back"
                color="#fff"
                reverseColor="#212226"
                size={18}
                onPress={() => navigation.navigate('Groups', { userType: 'rider' })}
                disabled={false}
              />
            }
            iconName="ios-arrow-back"
            onPress={() => navigation.navigate('Groups', { userType: 'rider' })}
          />
        </NavigationHeaderButtons>
      ),
    };
  };

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
        this.props.navigation.navigate('Groups', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
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

  handleOnAddRider = async (values, actions) => {
    try {
      setTimeout(() => {
        this.props.navigation.navigate('NewRider', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleOnImportRider = async (values, actions) => {
    try {
      setTimeout(() => {
        this.props.navigation.navigate('ImportRider', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleOnEditNewRider = async (values, actions) => {
    try {
      setTimeout(() => {
        this.props.navigation.navigate('EditRider', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleOnDelete = async () => {
    try {
      setTimeout(() => {
        this.props.navigation.navigate('Groups', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  render() {
    console.log('Nav param', 'EditGroup', this.props.navigation.getParam('userType', null));

    const { photo } = this.state;

    const ridersList = [
      { key: 'edit-rider1', imgPath: require('../../../../../assets/edit-rider.png'), name: 'Claire' },
      { key: 'edit-rider2', imgPath: require('../../../../../assets/edit-rider2.png'), name: 'Ben' }
    ];

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>General</StyledHeadline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              userType: 2,
              name: '',
              isDefault: false,
              riders: ridersList
            }}
            validationSchema={validationSchema}
            handleChoosePhoto={this.handleChoosePhoto}
            photo={photo}
            handleOnAddRider={this.handleOnAddRider}
            handleOnEditNewRider={this.handleOnEditNewRider}
            handleOnImportRider={this.handleOnImportRider}
            handleOnDelete={this.handleOnDelete}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}
