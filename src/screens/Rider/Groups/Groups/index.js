import React, { Component } from 'react';
import { ScrollView, View, Image, StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { Icon, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ButtonContainer,
  Container,
  Headline,
  BottomContainer,
  HelpButtonText,
  HelpButton
} from '../../../../components/Form/Elements';
import { NavigationHeaderButtons, Item } from '../../../../components/Header/HeaderButton';
import FormButton from '../../../../components/Form/FormButton';

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
  margin-top: -6px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;
const GroupContainer = styled(IconContainer)`
  margin-top: 0;
  margin-left: 25px;
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

export default class Groups extends Component {
  state = {};

  static navigationOptions = ({ navigation, navigation: { state } }) => {
    return {
      title: 'Groups',
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
                onPress={() => navigation.navigate('Home', { userType: 'rider' })}
                disabled={false}
              />
            }
            iconName="ios-arrow-back"
            onPress={() => navigation.navigate('Home', { userType: 'rider' })}
          />
        </NavigationHeaderButtons>
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        backgroundColor: '#fff',
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        }
      },
      headerTintColor: '#3e4958',
      headerBackground: () => (
        <Image style={{ width: '100%', height: 86 }} source={require('../../../../assets/map.png')} />
      ),
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 0.2,
        marginTop: 30,
        color: '#3e4958',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
      headerLayoutPreset: 'center'
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

      // if (response.user.uid) {
      //   const { uid } = response.user;
      //   const userData = { email, name, uid };
      //   await this.props.firebase.createNewUser(userData);
      //   this.props.navigation.navigate('App', { userType: null });
      // }
      setTimeout(() => {
        this.props.navigation.navigate('VehicleRegister', { userType: 'rider' });
        // this.props.navigation.navigate('Login', { userType: null });
      }, 1500);
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message);
    } finally {
      // TODO:
      // This is avoiding submit button loading icon
      // actions.setSubmitting(false);
    }
  };

  render() {
    console.log('Nav param', 'Groups', this.props.navigation.getParam('userType', null));

    const groupsList = [
      { key: 'edit-rider1', name: 'Soccer Team' },
      { key: 'edit-rider2', name: "Ben's Class" }
    ];

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Groups</StyledHeadline>

          {groupsList.map((groupItem, index) => (
            <GroupContainer key={index}>
              <Avatar
                rounded
                // source={{
                //   uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                // }}
                showEditButton={false}
                icon={{
                  name: 'group',
                  type: 'material',
                  color: '#5280e2'
                }}
                overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
                activeOpacity={0.7}
                size={53}
                onPress={() => this._navigateTo('EditGroup', { userType: 'rider', rider: groupItem })}
                disabled={false}
              />
              <LabelText>{`  ${groupItem.name}`}</LabelText>
            </GroupContainer>
          ))}

          <IconContainer>
            <Icon
              raised
              reverse
              type="feather"
              name="plus"
              color="#dde5f7"
              reverseColor="#5280e2"
              size={25}
              onPress={() => this._navigateTo('NewGroup', { userType: 'rider' })}
              disabled={false}
            />
            <LabelText>Create new group</LabelText>
          </IconContainer>
        </ScrollView>
      </StyledContainer>
    );
  }
}