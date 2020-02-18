import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { Container } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import Form from './form';
import { validationSchema } from './validation';
import { Icon } from 'react-native-elements';

const StyledContainer = styled(Container)`
  margin-top: 30px;
`;
const GroupTitle = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #5280e2;
`;
const IconContainer = styled(View)`
  margin-top: 30px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export default class SelectRiders extends Component {
  state = {
    selected: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select riders',
      headerLeft: () => (
        <ExtendedGoBackButton
          iconOnPress={() => navigation.navigate('SelectGroup', { userType: 'rider' })}
          itemOnPress={() => navigation.navigate('SelectGroup', { userType: 'rider' })}
        />
      )
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
      const { selected } = this.state;

      setTimeout(() => {
        this.props.navigation.navigate('SelectRiders', { userType: 'rider', groupId: selected });
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

  handleOnAddRiderToGroup = async (values, actions) => {
    try {
      setTimeout(() => {
        this.props.navigation.navigate('NewGroup', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  handleOnSelected = key => {
    this.setState(prevState => ({
      selected: prevState.selected.includes(key)
        ? prevState.selected.splice(prevState.selected.indexOf(key), 1)
        : [...prevState.selected, key]
    }));
  };

  render() {
    console.log(
      'Nav param',
      'SelectRiders',
      this.props.navigation.getParam('userType', null),
      this.props.navigation.getParam('groupId', null)
    );

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <IconContainer>
            <Icon
              raised
              reverse
              type="material"
              name="group"
              color="#dde5f7"
              reverseColor="#5280e2"
              size={15}
              disabled={false}
            />

            <GroupTitle>Family</GroupTitle>
          </IconContainer>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              userType: 2,
              selected: ''
            }}
            validationSchema={validationSchema}
            handleOnAddRiderToGroup={this.handleOnAddRiderToGroup}
            handleOnSelected={this.handleOnSelected}
            selected={this.state.selected}
            goToLogin={this.goToLogin}
            goToConfirmation={this.goToConfirmation}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}
