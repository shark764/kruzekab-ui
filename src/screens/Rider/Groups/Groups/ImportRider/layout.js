import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Container, HeaderMessage } from '../../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../../components/Header/Navigator';
import Form from './form';
import validationSchema from './validation';

const StyledContainer = styled(Container)`
  margin-top: 30px;
`;
const StyledHeaderMessage = styled(HeaderMessage)`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default class ImportRider extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Import riders',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('EditGroup')}
        itemOnPress={() => navigation.navigate('EditGroup')}
      />
    ),
  });

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { importRiders, groupId } = this.props;
      const { parentPhoneNumber } = values;
      await importRiders(groupId, parentPhoneNumber);

      this.navigateTo('EditGroup', {});
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      // This is avoiding submit button loading icon
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1500);
    }
  };

  render() {
    const { groupId, initialValues } = this.props;

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeaderMessage>
            Search a parent&apos;s phone number to invite their children to your group
          </StyledHeaderMessage>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            groupId={groupId}
            initialValues={initialValues}
            validationSchema={validationSchema}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

ImportRider.propTypes = {
  initialValues: PropTypes.shape.isRequired,
  importRiders: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
};
