import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';

const NavHeaderButton = props => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={25} color="#5280e2" />;
};

export const NavigationHeaderButtons = props => {
  return (
    <HeaderButtons
      left
      HeaderButtonComponent={NavHeaderButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={25} color="#5280e2" />}
      {...props}
    />
  );
};
export { Item } from 'react-navigation-header-buttons';
