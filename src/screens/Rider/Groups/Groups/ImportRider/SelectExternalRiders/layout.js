import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { ExtendedGoBackButton } from '../../../../../../components/Header/Navigator';
import Form from './form';
import { fetchExternalRiders, addParentToGroup } from '../../../../../../redux/requests';
import { Container, Headline } from '../../../../../../components/Form/Elements';
import { getInitials } from '../../../../../../utils/string';

const StyledContainer = styled(Container)`
  margin-top: 30px;
`;
const StyledHeadline = styled(Headline)`
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.2px;
  color: #212226;
  margin-bottom: 15px;
`;

export default class SelectExternalRiders extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add External Riders',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('ParentAccess')}
        itemOnPress={() => navigation.navigate('ParentAccess')}
      />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      refreshing: false,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getRiders();
  }

  getRiders = async () => {
    this.setState({
      loading: true,
    });
    const { externalClientId, setExternalRiders } = this.props;
    setExternalRiders(externalClientId, []);

    const { data } = await fetchExternalRiders();

    setExternalRiders(externalClientId, data);
    const dataSource = data.map(item => ({
      isSelect: false,
      initials: getInitials(item.name),
      ...item,
    }));
    this.setState({
      loading: false,
      refreshing: false,
      dataSource,
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getRiders();
      },
    );
  };

  handleOnSelected = selected => {
    const { dataSource } = this.state;

    const index = dataSource.findIndex(item => selected.id === item.id);
    const newDataSource = [...dataSource];
    const isSelect = !selected.isSelect;

    newDataSource[index] = { ...selected, isSelect };

    this.setState({
      dataSource: newDataSource,
    });
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { dataSource } = this.state;
      const {
        data: {
          data: { riders },
        },
      } = await addParentToGroup(dataSource);
      const { setGroupRiders, groupId } = this.props;
      setGroupRiders(groupId, riders);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);

      this.navigateTo('EditGroup', {});
    } catch (error) {
      actions.setFieldError('general', error.message);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  render() {
    const { dataSource, loading, refreshing } = this.state;
    console.log('dataSource ===>', dataSource);

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Riders</StyledHeadline>

          <Form
            dataSource={dataSource}
            handleOnSubmit={this.handleOnSubmit}
            handleOnSelected={this.handleOnSelected}
            loading={loading}
            refreshing={refreshing}
            handleRefresh={this.handleRefresh}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

SelectExternalRiders.propTypes = {
  groupId: PropTypes.number.isRequired,
  externalClientId: PropTypes.number.isRequired,
  setExternalRiders: PropTypes.func.isRequired,
  setGroupRiders: PropTypes.func.isRequired,
};
