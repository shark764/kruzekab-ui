import React, { Component } from 'react';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationHeaderButtons, Item } from '../components/Header/HeaderButton';

export const NavigationOptions = props => {
  return {
    title: 'Import riders',
    headerLeft: () => (
      <NavigationHeaderButtons>
        <Item
          title="Go Back"
          buttonWrapperStyle={{
            marginLeft: 12,
            marginTop: 30,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start'
          }}
          ButtonElement={
            <Icon
              raised
              reverse
              type="ionicon"
              name="ios-arrow-back"
              color="#fff"
              reverseColor="#212226"
              size={18}
              onPress={() => navigation.navigate('Groups', { userType: 'rider' })}
              disabled={false}
            />
          }
          iconName="ios-arrow-back"
          onPress={() => navigation.navigate('Groups', { userType: 'rider' })}
        />
      </NavigationHeaderButtons>
    ),
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      }
    },
    headerTintColor: '#3e4958',
    headerBackground: () => <Image style={{ width: '100%', height: 86 }} source={require('../assets/map.png')} />,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: 0.2,
      marginTop: 30,
      color: '#3e4958',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerLayoutPreset: 'center'
  };
};
