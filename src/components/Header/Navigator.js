import React from 'react';
import { NavigationHeaderButtons, Item } from './HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

export const GoBackButton = props => (
  <NavigationHeaderButtons>
    <Item
      title="Go Back"
      buttonWrapperStyle={{
        marginLeft: 12,
        marginTop: 10
      }}
      useIconComponent={Ionicons}
      iconName="md-arrow-back"
      {...props}
    />
  </NavigationHeaderButtons>
);

export const ExtendedGoBackButton = props => (
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
          disabled={false}
          onPress={props.iconOnPress}
          {...props.icon}
        />
      }
      iconName="ios-arrow-back"
      onPress={props.itemOnPress}
      {...props.item}
    />
  </NavigationHeaderButtons>
);
