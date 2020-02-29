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

export default class NewGroup extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Create a group',
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
      const { addGroup, addToNewGroup } = this.props;
      await addGroup(values);

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

  render() {
    const { initialValues } = this.props;

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>General</StyledHeadline>

          <Form
            handleOnSubmit={this.handleOnSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleOnAddRider={() => this.navigateTo('NewRider', { context: 'create-group' })}
            handleOnEditNewRider={riderId => this.navigateTo('EditRider', { context: 'create-group', riderId })}
            handleOnImportRider={() => this.navigateTo('ImportRider', { context: 'create-group' })}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

NewGroup.propTypes = {
  initialValues: PropTypes.shape.isRequired,
  addGroup: PropTypes.func.isRequired,
  addToNewGroup: PropTypes.func.isRequired,
};
