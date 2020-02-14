import React, { Component, Fragment } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar, ButtonGroup, ListItem, Button, SearchBar, Icon } from 'react-native-elements';
import { Headline, SubHeadline, Container } from '../../components/Form/Elements';
import styled from 'styled-components';
import axios from 'axios';
import AwesomeDebouncePromise from 'awesome-debounce-promise';


const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };
const StyledHeadline = styled(Text)`
    width: 237px;
    height: 25px;
    color: #3E4958;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.2px;
`;

const searchPlace = (text, currentPosition) =>  axios
  .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.latitude},${currentPosition.longitude}&radius=500&types=food&name=${text}&key=AIzaSyCH7pW8XhPRvUzm-JQ0f7aWVhN3QAUQO78`)

const debouncedSearchPlace = AwesomeDebouncePromise(
  searchPlace,
  500,
);
export default class SelectAddress extends Component {
  currentPosition = this.props.navigation.state.params.currentPosition;

  state = {
    addressPlaceholder: this.props.navigation.state.params.addressPlaceholder,
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
    searchedPlaces: []
  };

  updateIndex = (selectedIndex) => {
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
  }

  renderPlacesList = (places, type) => {
    let placesStatus = this.state.activeIndex;

    return (
      <View>
        {
          places.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{
                rounded: true,
                size: 'small',
                icon: { name: 'map-marker', type: 'material-community', color: '#FFFFFF', size: 20 },
                overlayContainerStyle: {
                  backgroundColor: '#A8B4CD',
                }
              }}
              title={l.alias || l.name}
              subtitle={l.formatted_address && l.formatted_address.split(',')[l.formatted_address.split(',').length - 1]
                || l.vicinity.split(',')[l.vicinity.split(',').length - 1]}
              checkBox={{
                iconType: 'material-community',
                checkedIcon: 'check-circle',
                uncheckedIcon: 'blank',
                uncheckedColor: 'transparent',
                wrapperStyle: {
                  backgroundColor: 'transparent'
                },
                containerStyle: {
                  backgroundColor: 'transparent'
                },
                checkedColor: '#5280E2',
                checked: placesStatus[type] === i
              }}
              onPress={() => {
                console.log('entra xxx')
                this.setState((prevState) => ({
                  activeIndex: {
                    ...prevState.activeIndex,
                    [type]: i,
                  },
                  selectedAddress: { ...places[i], selected: true },
                }));
              }}
              bottomDivider
            />))
        }
      </View>);
  }

  render() {
    const buttons = ['RECENT', 'SAVED'];
    const recentPlaces = [
      {
        alias: "Claire's School",
        name: 'Sidney High School',
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6929378,
            "lng": -89.2532107
          }
        }
      },
      {
        alias: "Jonh's School",
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6860422,
            "lng": -89.2206216
          }
        }
      },
      {
        alias: "Patrick's School",
        name: 'Sidney High School',
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6929378,
            "lng": -89.2532107
          }
        }
      },
      {
        alias: "Robert's School",
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6860422,
            "lng": -89.2206216
          }
        }
      },
      {
        alias: "Sandra's School",
        name: 'Sidney High School',
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6929378,
            "lng": -89.2532107
          }
        }
      },
      {
        alias: "John's School",
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6860422,
            "lng": -89.2206216
          }
        }
      },
      {
        alias: "Sara's School",
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6860422,
            "lng": -89.2206216
          }
        }
      },
    ];

    const savedPlaces = [
      {
        alias: "Lou's School",
        'formatted_address': '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        "geometry": {
          "location": {
            "lat": 13.6877854,
            "lng": -89.218499,
          }
        }
      }

    ];


    return (
      <Container>
        <ScrollView>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 13,
            marginLeft: 15,
          }}>
            <Avatar
              rounded
              size='small'
              icon={{ name: 'chevron-left', type: 'font-awesome', color: '#000000' }}
              onPress={() => this.props.navigation.goBack()}
              activeOpacity={0.7}
              overlayContainerStyle={{
                backgroundColor: '#FFFFFF',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.30,
                elevation: 13,
              }}
            />
            <StyledHeadline>Select Address</StyledHeadline>
          </View>
          <View style={{
            marginTop: 26,
            marginLeft: 25,
            marginRight: 25,
          }}>
            <SearchBar
              placeholder={this.state.addressPlaceholder}
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
              clearIcon={true}
              searchIcon={false}
              lightTheme={true}
              value={this.state.firstQuery}
              inputContainerStyle={{
                backgroundColor: '#FFFFFF',
              }}
              containerStyle={{
                backgroundColor: '#FFFFFF',
                borderTopColor: '#FFFFFF',
                borderBottomColor: '#FFFFFF',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,
                elevation: 11,
              }}
              //onFocus={() => this.setState({ searchMode: true })}
              onClear={() => this.setState(prevState => 
                ({ 
                  searchMode: false,
                  activeIndex: {
                    ...prevState.activeIndex,
                    searched: -1,
                  },
                }))}
            >
            </SearchBar>
            <View style={{
              flex: 1,
              alignItems: "flex-start"
            }}>
              <Button
                type='clear'
                icon={
                  <Icon
                    name='map-marker-radius'
                    type='material-community'
                    size={20}
                    color='#5280E2'
                  />
                }
                title='Show on a map'
              />
            </View>
          </View>
          {!this.state.searchMode ? (
            <View style={{
              marginTop: 30
            }}>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.state.activeIndex.buttonGroup}
                buttons={buttons}
                con
                containerStyle={{
                  height: 50,
                  width: 200,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#FFFFFF',
                }}
                innerBorderStyle={{
                  color: 'white'
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
                  fontWeight: 'bold'
                }} />
              <ScrollView
                style={{
                  height: 300,
                }}
                nestedScrollEnabled={true}>
                {this.state.activeIndex.buttonGroup === 0 ? this.renderPlacesList(recentPlaces, 'recent') : this.renderPlacesList(savedPlaces, 'saved')}
              </ScrollView>
            </View>
          ) : (
              <ScrollView  style={{
                height: 400,
              }}
              nestedScrollEnabled={true}>
                {this.renderPlacesList(this.state.searchedPlaces, 'searchedPlaces')}
              </ScrollView>
            )}
          <View style={{
            marginLeft: 24,
            marginRight: 24,
            marginTop: 19,
            paddingBottom: 20,
          }}>
            <Button
              title="Done"
              disabled={!this.state.selectedAddress.selected}
              onPress={() => {
                this.props.navigation.navigate('AddressDetails', {
                  selectedAddress: this.state.selectedAddress,
                  setSelectedAddress: this.props.navigation.state.params.setSelectedAddress,
                });
              }}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}