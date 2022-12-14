import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { ExtendedGoBackButton } from '../../../../../components/Header/Navigator';
import Form from './form';
import { fetchRiders, addRidersToGroupRequest } from '../../../../../redux/requests';
import { Container, Headline } from '../../../../../components/Form/Elements';

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

export default class AddRiders extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Riders to Group',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('EditGroup')}
        itemOnPress={() => navigation.navigate('EditGroup')}
      />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getRiders();
  }

  getRiders = async () => {
    const { setRiders } = this.props;
    setRiders([]);

    const { data } = await fetchRiders();

    setRiders(data);
    const dataSource = data.map(item => ({
      isSelect: false,
      ...item,
    }));
    this.setState({
      dataSource,
    });
  };

  handleOnSelected = data => {
    const { dataSource } = this.state;

    const index = dataSource.findIndex(item => data.item.id === item.id);
    const newDataSource = [...dataSource];
    const isSelect = !data.item.isSelect;

    newDataSource[index] = { ...data.item, isSelect };

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
      } = await addRidersToGroupRequest(dataSource);
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
    const { riders } = this.props;
    const { dataSource } = this.state;
    console.log('riders ===>', riders.toJS());
    console.log('dataSource ===>', dataSource);

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Riders</StyledHeadline>

          <Form
            riders={riders.toJS()}
            dataSource={dataSource}
            handleOnSubmit={this.handleOnSubmit}
            handleOnSelected={this.handleOnSelected}
            handleOnCreateRider={() => this.navigateTo('NewRider', { context: 'add-riders' })}
          />
        </ScrollView>
      </StyledContainer>
    );
  }
}

AddRiders.propTypes = {
  groupId: PropTypes.number.isRequired,
  riders: PropTypes.shape([]).isRequired,
  setGroupRiders: PropTypes.func.isRequired,
  setRiders: PropTypes.func.isRequired,
};
