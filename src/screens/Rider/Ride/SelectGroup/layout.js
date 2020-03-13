import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView } from 'react-native';
import styled from 'styled-components';

import { Container } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';
import { fetchGroups } from '../../../../redux/requests';

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

  componentDidMount() {
    this.getGroups();
  }

  getGroups = async () => {
    const { setGroups } = this.props;
    setGroups([]);

    const data = await fetchGroups();
    const groups = data.data.map(group => ({
      riders: [],
      ...group,
    }));
    setGroups(groups);
  };

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    const { selected } = this.state;
    const { setSelectedGroup } = this.props;
    setSelectedGroup(selected);

    const { navigation } = this.props;

    // This is avoiding submit button loading icon
    actions.setSubmitting(false);

    this.navigateTo('SelectRiders', {
      userType: 'rider',
      groupId: selected,
      selectedAddress: navigation.state.params.selectedAddress,
    });
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
    const { groups } = this.props;

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
            groups={groups}
            selected={selected}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

SelectGroup.propTypes = {
  groups: PropTypes.shape([]).isRequired,
  setGroups: PropTypes.func.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
};
