import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Icon, Avatar } from 'react-native-elements';
import {
  ButtonContainer, Container, Headline, BottomButtonContainer,
} from '../../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../../components/Header/Navigator';
import FormButton from '../../../../../components/Form/FormButton';

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
const IconContainer = styled(ButtonContainer)`
  margin-top: -6px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;
const RiderContainer = styled(IconContainer)`
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

export default class AddRiders extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Riders to Group',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('Groups')}
        itemOnPress={() => navigation.navigate('Groups')}
      />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  handleOnSubmit = async (values, actions) => {
    try {
      const { addRiderToGroup, groupId } = this.props;
      const { selected } = this.state;

      const promises = selected.map(async riderId => {
        const riderAdded = await addRiderToGroup(groupId, riderId);
        return riderAdded;
      });
      await Promise.all(promises);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);

      this.navigateTo('EditGroup', {});
    } catch (error) {
      actions.setFieldError('general', error.message);

      // This is avoiding submit button loading icon
      actions.setSubmitting(false);
    }
  };

  handleOnSelected = key => {
    this.setState(prevState => {
      const selected = [...prevState.selected];
      const index = selected.indexOf(key);
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(key);
      }

      return {
        selected,
      };
    });
  };

  render() {
    const { riders } = this.props;

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Riders</StyledHeadline>

          {riders.map(rider => (
            <RiderContainer key={rider.get('id')}>
              <Avatar
                rounded
                source={{
                  uri: rider.getIn(['photo', 'uri']),
                }}
                showEditButton={false}
                icon={{
                  name: 'md-person',
                  type: 'ionicon',
                  color: '#5280e2',
                }}
                overlayContainerStyle={{ backgroundColor: '#dde5f7' }}
                activeOpacity={0.7}
                size={53}
                onPress={() => this.navigateTo('EditRider', { riderId: rider.get('id') })}
                disabled={false}
              />
              <LabelText>{`  ${rider.get('name')}`}</LabelText>
            </RiderContainer>
          ))}

          <IconContainer>
            <Icon
              raised
              reverse
              type="ionicon"
              name="md-person-add"
              color="#dde5f7"
              reverseColor="#5280e2"
              size={25}
              onPress={() => this.navigateTo('NewRider', { context: 'add-riders' })}
              disabled={false}
            />
            <LabelText>Create new rider</LabelText>
          </IconContainer>

          <BottomButtonContainer>
            <FormButton
              onPress={this.handleOnSubmit}
              title="Continue"
              textColor="white"
              disabled={false}
              loading={false}
            />
          </BottomButtonContainer>
        </ScrollView>
      </StyledContainer>
    );
  }
}

AddRiders.propTypes = {
  riders: PropTypes.shape.isRequired,
  addRiderToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
};
