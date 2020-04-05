import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import {
  Avatar, ButtonGroup, ListItem, Button, SearchBar, Icon,
} from 'react-native-elements';
import styled from 'styled-components';
import axios from 'axios';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Container } from '../../../components/Form/Elements';

const StyledHeadline = styled(Text)`
  width: 237px;
  height: 25px;
  color: #3e4958;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.2px;
`;

const searchPlace = (text, currentPosition) => axios.get(
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.get(
    'latitude',
  )},${currentPosition.get(
    'longitude',
  )}&radius=500&types=food&name=${text}&key=AIzaSyCH7pW8XhPRvUzm-JQ0f7aWVhN3QAUQO78`,
);

const debouncedSearchPlace = AwesomeDebouncePromise(searchPlace, 500);
export default class SelectAddress extends Component {
  constructor(props) {
    super(props);

    const { navigation, currentPosition } = this.props;
    this.currentPosition = currentPosition;

    this.state = {
      addressPlaceholder: navigation.state.params.addressPlaceholder,
      firstQuery: '',
      activeIndex: {
        buttonGroup: 0,
        recent: -1,
        saved: -1,
        searched: -1,
      },
      selectedAddress: {
        selected: false,
      },
      searchedPlaces: [],
    };
  }

  navigateTo = (destinationScreen, params = {}) => {
    const { navigation } = this.props;
    navigation.navigate(destinationScreen, params);
  };

  updateIndex = selectedIndex => {
    this.setState({
      activeIndex: {
        buttonGroup: selectedIndex,
        recent: -1,
        saved: -1,
      },
      selectedAddress: {
        selected: false,
      },
      searchMode: false,
    });
  };

  renderPlacesList = (places, type) => {
    const { activeIndex } = this.state;
    const placesStatus = activeIndex;

    return (
      <View>
        {places.map((l, i) => (
          <ListItem
            key={i.toString()}
            leftAvatar={{
              rounded: true,
              size: 'small',
              icon: {
                name: 'map-marker',
                type: 'material-community',
                color: '#FFFFFF',
                size: 20,
              },
              overlayContainerStyle: {
                backgroundColor: '#A8B4CD',
              },
            }}
            title={l.alias || l.name}
            subtitle={
              (l.address && l.address.split(',')[l.address.split(',').length - 1])
              || l.vicinity.split(',')[l.vicinity.split(',').length - 1]
            }
            checkBox={{
              iconType: 'material-community',
              checkedIcon: 'check-circle',
              uncheckedIcon: 'blank',
              uncheckedColor: 'transparent',
              wrapperStyle: {
                backgroundColor: 'transparent',
              },
              containerStyle: {
                backgroundColor: 'transparent',
              },
              checkedColor: '#5280E2',
              checked: placesStatus[type] === i,
            }}
            onPress={() => {
              this.setState(prevState => ({
                activeIndex: {
                  ...prevState.activeIndex,
                  [type]: i,
                },
                selectedAddress: { ...places[i], selected: true },
              }));
            }}
            bottomDivider
          />
        ))}
      </View>
    );
  };

  render() {
    const buttons = ['RECENT', 'SAVED'];
    const recentPlaces = [
      {
        name: 'Riverton High School',
        address: '12476 S. Silverwolf Way, Riverton, UT 84065',
        latitude: 40.5106449,
        longitude: -111.9881723,
      },
      {
        name: 'Monte Vista Elementary School',
        address: '11121 S 2700 W, South Jordan, UT 84095',
        latitude: 40.5140779,
        longitude: -111.9761671,
      },
      {
        name: 'Museum of Natural Curiosity at Thanksgiving Point',
        address: '3605 Garden Dr, Lehi, UT 84043',
        latitude: 40.4323651,
        longitude: -111.9102606,
      },
    ];

    const savedPlaces = [
      {
        name: 'Sunnyside Park',
        address: '1735 Sunnyside Ave S, Salt Lake City, UT 84108',
        latitude: 40.7469248,
        longitude: -111.8573841,
      },
    ];

    const { navigation } = this.props;
    const {
      addressPlaceholder, firstQuery, searchMode, activeIndex, searchedPlaces, selectedAddress,
    } = this.state;

    return (
      <Container>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 13,
              marginLeft: 15,
            }}
          >
            <Avatar
              rounded
              size="small"
              icon={{
                name: 'ios-arrow-back', type: 'ionicon', color: '#000000', size: 18,
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
            <StyledHeadline>Select Address</StyledHeadline>
          </View>
          <View style={{ marginTop: 26, marginLeft: 25, marginRight: 25 }}>
            <SearchBar
              placeholder={addressPlaceholder}
              onChangeText={async query => {
                this.setState({ firstQuery: query });
                if (query.length > 4) {
                  const { data } = await debouncedSearchPlace(query, this.currentPosition);
                  console.log(data.results);
                  this.setState({
                    searchedPlaces: data.results,
                    searchMode: true,
                  });
                }
              }}
              clearIcon
              searchIcon={false}
              lightTheme
              value={firstQuery}
              inputContainerStyle={{
                backgroundColor: '#FFFFFF',
              }}
              containerStyle={{
                backgroundColor: '#FFFFFF',
                borderTopColor: '#FFFFFF',
                borderBottomColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,
                elevation: 11,
              }}
              // onFocus={() => this.setState({ searchMode: true })}
              onClear={() => this.setState(prevState => ({
                searchMode: false,
                selectedAddress: {
                  selected: false,
                },
                activeIndex: {
                  ...prevState.activeIndex,
                  searched: -1,
                },
              }))}
            />
            {
              selectedAddress.selected && (
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Button
                    type="clear"
                    icon={<Icon name="map-marker-radius" type="material-community" size={20} color="#5280E2" />}
                    title="Show on a map"
                    onPress={() => {
                      this.navigateTo('AddressMapPreview', {
                        coords: {
                          longitude: selectedAddress.longitude || selectedAddress.geometry.location.lng,
                          latitude: selectedAddress.latitude || selectedAddress.geometry.location.lat,
                        },
                      });
                    }}
                  />
                </View>
              )
            }
          </View>
          {!searchMode ? (
            <View style={{ marginTop: 30 }}>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={activeIndex.buttonGroup}
                buttons={buttons}
                con
                containerStyle={{
                  height: 50,
                  width: 200,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#FFFFFF',
                }}
                innerBorderStyle={{
                  color: 'white',
                }}
                selectedButtonStyle={{
                  backgroundColor: '#FFFFFF',
                  borderTopColor: '#FFFFFF',
                  borderLeftColor: '#FFFFFF',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#5280E2',
                  borderStartColor: '#FFFFFF',
                  borderEndColor: '#FFFFFF',
                  borderWidth: 2,
                }}
                selectedTextStyle={{
                  color: '#5280E2',
                }}
                textStyle={{
                  color: '#3E4958',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              />
              <ScrollView style={{ height: 300 }} nestedScrollEnabled>
                {activeIndex.buttonGroup === 0
                  ? this.renderPlacesList(recentPlaces, 'recent')
                  : this.renderPlacesList(savedPlaces, 'saved')}
              </ScrollView>
            </View>
          ) : (
            <ScrollView style={{ height: 400 }} nestedScrollEnabled>
              {this.renderPlacesList(searchedPlaces, 'searchedPlaces')}
            </ScrollView>
          )}
          <View
            style={{
              marginLeft: 24,
              marginRight: 24,
              marginTop: 19,
              paddingBottom: 20,
            }}
          >
            <Button
              title="Done"
              disabled={!selectedAddress.selected}
              onPress={() => {
                this.navigateTo('AddressDetails', {
                  selectedAddress,
                  // setSelectedAddress: this.props.navigation.state.params.setSelectedAddress
                });
              }}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

SelectAddress.propTypes = {
  currentPosition: PropTypes.shape.isRequired,
};
