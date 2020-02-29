import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Container, Headline } from '../../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';

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

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { updateGroup } = this.props;
      await updateGroup(values, values.id);

      this.navigateTo('Groups', {});
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
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

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>General</StyledHeadline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            groupId={groupId}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleOnAddRider={() => this.navigateTo('NewRider', { context: 'edit-group', groupId })}
            handleOnEditNewRider={riderId => this.navigateTo('EditRider', { context: 'edit-group', riderId, groupId })}
            handleOnImportRider={() => this.navigateTo('ImportRider', { context: 'edit-group', groupId })}
            handleOnDelete={this.handleOnDelete}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

EditGroup.propTypes = {
  initialValues: PropTypes.shape.isRequired,
  groupId: PropTypes.number.isRequired,
  updateGroup: PropTypes.func.isRequired,
  removeGroup: PropTypes.func.isRequired,
};
