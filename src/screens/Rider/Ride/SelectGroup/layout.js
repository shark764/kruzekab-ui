import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { ButtonContainer, Container, Headline, BottomContainer } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import Form from './form';
import { validationSchema } from './validation';

const StyledContainer = styled(Container)`
  margin-top: 130px;
`;

export default class SelectGroup extends Component {
  state = {
    selected: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select a group',
      headerLeft: () => (
        <ExtendedGoBackButton
          iconOnPress={() => navigation.navigate('AddressDetails', { userType: 'rider' })}
          itemOnPress={() => navigation.navigate('AddressDetails', { userType: 'rider' })}
        />
      ),
      headerBackground: () => (
        <Image style={{ width: '100%', height: 250 }} source={require('../../../../assets/map.png')} />
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
        this.props.navigation.navigate('SelectRiders', {
          userType: 'rider',
          groupId: selected,
          selectedAddress: this.props.navigation.state.params.selectedAddress,
          setSelectedAddress: this.props.navigation.state.params.setSelectedAddress
        });
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

  handleOnAddGroup = async (values, actions) => {
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
      selected: prevState.selected !== key ? key : null
    }));
  };

  render() {
    console.log('Nav param', 'SelectGroup', this.props.navigation.getParam('userType', null));

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              userType: 2,
              selected: ''
            }}
            validationSchema={validationSchema}
            handleOnAddGroup={this.handleOnAddGroup}
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
