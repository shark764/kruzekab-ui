import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { NavigationHeaderButtons, Item } from './HeaderButton';

export const GoBackButton = props => (
  <NavigationHeaderButtons>
    <Item
      title="Go Back"
      buttonWrapperStyle={{
        marginLeft: 12,
        marginTop: 10,
      }}
      useIconComponent={Ionicons}
      iconName="md-arrow-back"
      {...props}
    />
  </NavigationHeaderButtons>
);

export const ExtendedGoBackButton = ({
  iconOnPress, icon, itemOnPress, item,
}) => (
  <NavigationHeaderButtons>
    <Item
      title="Go Back"
      buttonWrapperStyle={{
        marginLeft: 12,
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
      ButtonElement={(
        <Icon
          raised
          reverse
          type="ionicon"
          name="ios-arrow-back"
          color="#fff"
          reverseColor="#212226"
          size={18}
          disabled={false}
          onPress={iconOnPress}
          {...icon}
        />
      )}
      iconName="ios-arrow-back"
      onPress={itemOnPress}
      {...item}
    />
  </NavigationHeaderButtons>
);

ExtendedGoBackButton.propTypes = {
  iconOnPress: PropTypes.func.isRequired,
  icon: PropTypes.shape.isRequired,
  itemOnPress: PropTypes.func.isRequired,
  item: PropTypes.shape.isRequired,
};
