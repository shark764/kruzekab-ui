import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import styled from 'styled-components';

import { Container } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';

const StyledContainer = styled(Container)`
  margin-top: 130px;
`;

export default class SelectGroup extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Select a group',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('AddressDetails')}
        itemOnPress={() => navigation.navigate('AddressDetails')}
      />
    ),
    headerBackground: () => (
      <Image style={{ width: '100%', height: 250 }} source={require('../../../../assets/map.png')} />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { selected } = this.state;

      setTimeout(() => {
        const { navigation } = this.props;

        // This is avoiding submit button loading icon
        actions.setSubmitting(false);

        navigation.navigate('SelectRiders', {
          userType: 'rider',
          groupId: selected,
          selectedAddress: navigation.state.params.selectedAddress,
        });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleOnAddGroup = async (values, actions) => {
    try {
      setTimeout(() => {
        const { navigation } = this.props;
        navigation.navigate('NewGroup', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  handleOnSelected = key => {
    this.setState(prevState => ({
      selected: prevState.selected !== key ? key : null,
    }));
  };

  render() {
    const { selected } = this.state;

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              userType: 2,
              selected: '',
            }}
            validationSchema={validationSchema}
            handleOnAddGroup={this.handleOnAddGroup}
            handleOnSelected={this.handleOnSelected}
            selected={selected}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}
