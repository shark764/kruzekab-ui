import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components';

import { Icon } from 'react-native-elements';
import { Container } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';

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
  static navigationOptions = ({ navigation }) => ({
    title: 'Select riders',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('SelectGroup')}
        itemOnPress={() => navigation.navigate('SelectGroup')}
      />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { selected } = this.state;
      const { updateSelectedAddress, location, navigation } = this.props;

      updateSelectedAddress(location, navigation.state.params.selectedAddress);

      actions.setSubmitting(false);
      navigation.navigate('Home', { userType: 'rider', groupId: selected });
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
        const { navigation } = this.props;
        navigation.navigate('NewGroup', { userType: 'rider' });
      }, 1500);
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  handleOnSelected = key => {
    this.setState(prevState => ({
      selected: prevState.selected.includes(key)
        ? prevState.selected.splice(prevState.selected.indexOf(key), 1)
        : [...prevState.selected, key],
    }));
  };

  render() {
    const { selected } = this.state;
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

            <GroupTitle>Kid&apos;s School</GroupTitle>
          </IconContainer>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={{
              userType: 2,
              selected: '',
            }}
            validationSchema={validationSchema}
            handleOnAddRiderToGroup={this.handleOnAddRiderToGroup}
            handleOnSelected={this.handleOnSelected}
            selected={selected}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

SelectRiders.propTypes = {
  updateSelectedAddress: PropTypes.shape.isRequired,
  location: PropTypes.shape.isRequired,
};
