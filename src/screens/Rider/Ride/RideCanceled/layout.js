import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar, ListItem, Button } from 'react-native-elements';
import styled from 'styled-components';
import { Container } from '../../../../components/Form/Elements';

const MainText = styled(Text)`
  position: absolute;
  width: 289px;
  height: 60px;
  top: 126px;
  left: 50px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.2px;
  color: #3e4958;
`;

const HeaderView = styled(View)`
  position: absolute;
  flex: 1;
  top: 25px;
  margin-left: 25px;
`;

const ReasonsListView = styled(ScrollView)`
  margin: 200px 31px 0px;
`;

export default class RideCanceled extends Component {
  reasons = [
    { id: 1, name: "Can't contact the rider" },
    { id: 2, name: 'Driver is late' },
    { id: 3, name: 'The price is not reasonable' },
    { id: 4, name: 'Pickup address is incorrect' },
    { id: 5, name: 'Other' },
  ];

  constructor() {
    super();
    this.state = {
      selectedReason: -1,
    };
  }

  setSelectedReason = id => this.setState({
    selectedReason: id,
  });

  renderReasons = selectedReason => (
    <ReasonsListView>
      {this.reasons.map(reason => (
        <ListItem
          key={reason.id.toString()}
          title={reason.name}
          checkBox={{
            iconType: 'material-community',
            checkedIcon: 'check-circle',
            uncheckedIcon: 'checkbox-blank-circle-outline',
            uncheckedColor: '#D5DDE0',
            wrapperStyle: {
              backgroundColor: 'transparent',
            },
            containerStyle: {
              backgroundColor: 'transparent',
            },
            checkedColor: '#5280E2',
            checked: selectedReason === reason.id,
            onIconPress: () => this.setSelectedReason(reason.id),
          }}
          onPress={() => this.setSelectedReason(reason.id)}
          bottomDivider
        />
      ))}
    </ReasonsListView>
  );

  render() {
    const { selectedReason } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <Container>
          <MainText>Please select the reason for cancellation</MainText>
          {this.renderReasons(selectedReason)}
        </Container>
        <HeaderView>
          <Avatar
            rounded
            size="small"
            icon={{
              name: 'ios-arrow-back',
              type: 'ionicon',
              color: '#000000',
              size: 18,
            }}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            overlayContainerStyle={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.39,
              shadowRadius: 8.3,
              elevation: 13,
            }}
          />
        </HeaderView>
        <View
          style={{
            marginLeft: 24,
            marginRight: 24,
            marginTop: 19,
            paddingBottom: 48,
          }}
        >
          <Button title="Done" disabled={selectedReason === -1} onPress={() => {}} />
        </View>
      </Container>
    );
  }
}

RideCanceled.propTypes = {};
