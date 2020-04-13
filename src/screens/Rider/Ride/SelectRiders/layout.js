import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import Form from './form';
import {
  fetchGroup,
  createRide,
  // createRide
} from '../../../../redux/requests';
import { Container } from '../../../../components/Form/Elements';
import { getInitials } from '../../../../utils/string';

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
      loading: false,
      refreshing: false,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getGroupRiders();
  }

  getGroupRiders = async () => {
    this.setState({
      loading: true,
    });

    const { setGroupRiders, groupId } = this.props;
    setGroupRiders(groupId, []);

    const { data } = await fetchGroup(groupId);

    setGroupRiders(groupId, data.groupRiders);
    const dataSource = data.groupRiders.map(item => ({
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

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getGroupRiders();
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
        updateSelectedAddress,
        location,
        navigation,
        addToNewRide,
        groupId,
        setCurrentRide,
        addRide,
      } = this.props;

      const mapRiders = dataSource
        .filter(rider => rider.isSelect)
        .map(rider => ({
          id: rider.id,
        }));
      addToNewRide({ riders: mapRiders });
      const { data } = await createRide();
      addRide(data.data);
      setCurrentRide(data.data.id);

      // For some reason, this has to be here, after all redux changes
      // otherwise, it'll fail
      updateSelectedAddress(location, navigation.state.params.selectedAddress);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);

      navigation.navigate('Home', { userType: 'rider', groupId });
    } catch (error) {
      actions.setFieldError('general', error.message);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  render() {
    const { dataSource, loading, refreshing } = this.state;
    const { selectedGroup } = this.props;
    const groupName = selectedGroup && selectedGroup.get('name');
    const countSelected = dataSource.filter(rider => rider.isSelect).length;

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

            <GroupTitle>{groupName}</GroupTitle>
          </IconContainer>

          <Form
            dataSource={dataSource}
            handleOnSubmit={this.handleOnSubmit}
            handleOnAddRiderToGroup={() => this.navigateTo('NewGroup', { context: 'select-riders', userType: 'rider' })}
            handleOnSelected={this.handleOnSelected}
            loading={loading}
            refreshing={refreshing}
            handleRefresh={this.handleRefresh}
            countSelected={countSelected}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

SelectRiders.propTypes = {
  groupId: PropTypes.number.isRequired,
  selectedGroup: PropTypes.shape({
    toJS: PropTypes.func,
    getIn: PropTypes.func,
    get: PropTypes.func,
  }).isRequired,
  addToNewRide: PropTypes.func.isRequired,
  setGroupRiders: PropTypes.func.isRequired,
  updateSelectedAddress: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setCurrentRide: PropTypes.func.isRequired,
  addRide: PropTypes.func.isRequired,
};
