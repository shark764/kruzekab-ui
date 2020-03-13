import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Container, HeaderMessage } from '../../../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../../../components/Header/Navigator';
import { fetchParentAccess } from '../../../../../../redux/requests';
import Form from './form';

const StyledContainer = styled(Container)`
  margin-top: 30px;
`;
const StyledHeaderMessage = styled(HeaderMessage)`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default class ParentAccess extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Parent Access',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('EditGroup')}
        itemOnPress={() => navigation.navigate('EditGroup')}
      />
    ),
  });

  componentDidMount() {
    this.getParentAccess();
  }

  getParentAccess = async () => {
    const { setExternalClients } = this.props;
    setExternalClients([]);

    const data = await fetchParentAccess();
    const externalClients = data.data.map(client => ({
      riders: [],
      ...client,
    }));
    setExternalClients(externalClients);
  };

  handleOnSelected = clientId => {
    const { setSelectedExternalClient } = this.props;
    setSelectedExternalClient(clientId);
    this.navigateTo('SelectExternalRiders');
  };

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  render() {
    const { externalClients } = this.props;
    console.log('Approved imports - externalClients ===>', externalClients.toJS());

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeaderMessage>These clients have given you access to their riders</StyledHeaderMessage>

          <Form externalClients={externalClients} handleOnSelected={this.handleOnSelected} />
        </ScrollView>
      </StyledContainer>
    );
  }
}

ParentAccess.propTypes = {
  externalClients: PropTypes.shape([]).isRequired,
  setExternalClients: PropTypes.func.isRequired,
  setSelectedExternalClient: PropTypes.func.isRequired,
};
