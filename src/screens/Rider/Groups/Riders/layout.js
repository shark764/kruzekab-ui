import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Icon, Avatar } from 'react-native-elements';
import { ButtonContainer, Container, Headline } from '../../../../components/Form/Elements';
import { ExtendedGoBackButton } from '../../../../components/Header/Navigator';
import { fetchRiders } from '../../../../redux/requests';

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

export default class Riders extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'My Riders',
    headerLeft: () => (
      <ExtendedGoBackButton
        iconOnPress={() => navigation.navigate('Home')}
        itemOnPress={() => navigation.navigate('Home')}
      />
    ),
  });

  componentDidMount() {
    this.getRiders();
  }

  getRiders = async () => {
    const data = await fetchRiders();

    const { setRiders } = this.props;
    setRiders(data.data);
  };

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  render() {
    const { riders } = this.props;
    console.log('riders ===>', riders.toJS());

    return (
      <StyledContainer enabled behavior="">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledHeadline>Riders</StyledHeadline>

          {riders.map(rider => (
            <RiderContainer key={rider.get('id')}>
              <Avatar
                rounded
                source={{
                  uri: `http://${rider.get('pictureUrl')}`,
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
              onPress={() => this.navigateTo('NewRider', { context: 'riders' })}
              disabled={false}
            />
            <LabelText>Create new rider</LabelText>
          </IconContainer>
        </ScrollView>
      </StyledContainer>
    );
  }
}

Riders.propTypes = {
  riders: PropTypes.shape.isRequired,
  setRiders: PropTypes.func.isRequired,
};
