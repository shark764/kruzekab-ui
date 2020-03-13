import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Container, Headline } from '../../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';
import { fetchGroup, updateGroupRequest } from '../../../../../redux/requests';

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

export default class EditGroup extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit group',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('Groups')}
        itemOnPress={() => navigation.navigate('Groups')}
      />
    ),
  });

  componentDidMount() {
    this.getGroupRiders();
  }

  getGroupRiders = async () => {
    const { setGroupRiders, groupId } = this.props;
    setGroupRiders(groupId, []);

    const { data } = await fetchGroup(groupId);

    setGroupRiders(groupId, data.groupRiders);
  };

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { updateGroup } = this.props;
      const { data } = await updateGroupRequest(values);
      updateGroup(values.id, data.data);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);

      this.navigateTo('Groups', {});
    } catch (error) {
      actions.setFieldError('general', error.message);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleOnDelete = async () => {
    try {
      const { removeGroup, groupId } = this.props;
      await removeGroup(groupId);
      this.navigateTo('Groups');
    } catch (error) {
      // No error
    }
  };

  render() {
    const { groupId, initialValues } = this.props;
    console.log('%c INITIALVALUES', 'background: black; color: white;', initialValues);

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>General</StyledHeadline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            groupId={groupId}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleOnAddRider={() => this.navigateTo('AddRiders', { context: 'edit-group', groupId })}
            handleOnCreateRider={() => this.navigateTo('NewRider', { context: 'edit-group', groupId })}
            handleOnEditNewRider={riderId => this.navigateTo('EditRider', { context: 'edit-group', riderId, groupId })}
            handleOnImportRider={() => this.navigateTo('ImportRider', { context: 'edit-group', groupId })}
            handleOnAddExternalRider={() => this.navigateTo('ParentAccess', { context: 'edit-group', groupId })}
            handleOnDelete={this.handleOnDelete}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

EditGroup.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  groupId: PropTypes.number.isRequired,
  updateGroup: PropTypes.func.isRequired,
  removeGroup: PropTypes.func.isRequired,
  setGroupRiders: PropTypes.func.isRequired,
};
