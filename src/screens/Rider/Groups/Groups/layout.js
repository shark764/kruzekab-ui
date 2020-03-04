import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Icon, Avatar } from 'react-native-elements';
import { ButtonContainer, Container, Headline } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import { fetchGroups } from '../../../../redux/requests';

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
const IconContainer = styled(ButtonContainer)`
  margin-top: -6px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;
const GroupContainer = styled(IconContainer)`
  margin-top: 0;
  margin-left: 25px;
`;
const LabelText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #6b768d;
  justify-content: center;
  align-items: center;
`;

export default class Groups extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Groups',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('Home')}
        itemOnPress={() => navigation.navigate('Home')}
      />
    ),
  });

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

  editGroup = groupId => {
    const { setSelectedGroup } = this.props;
    setSelectedGroup(groupId);
    this.navigateTo('EditGroup');
  };

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  render() {
    const { groups } = this.props;
    console.log('Groups list - groups ===>', groups.toJS());

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Groups</StyledHeadline>

          {groups.map(group => (
            <GroupContainer key={group.get('id')}>
              <Avatar
                rounded
                showEditButton={false}
                icon={{
                  name: 'group',
                  type: 'material',
                  color: '#5280e2',
                }}
                overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
                activeOpacity={0.7}
                size={53}
                onPress={() => this.editGroup(group.get('id'))}
                disabled={false}
              />
              <LabelText>{`  ${group.get('name')}`}</LabelText>
            </GroupContainer>
          ))}

          <IconContainer>
            <Icon
              raised
              reverse
              type="feather"
              name="plus"
              color="#dde5f7"
              reverseColor="#5280e2"
              size={25}
              onPress={() => this.navigateTo('NewGroup', { context: 'groups' })}
              disabled={false}
            />
            <LabelText>Create new group</LabelText>
          </IconContainer>
        </ScrollView>
      </StyledContainer>
    );
  }
}

Groups.propTypes = {
  groups: PropTypes.shape([]).isRequired,
  setGroups: PropTypes.func.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
};
