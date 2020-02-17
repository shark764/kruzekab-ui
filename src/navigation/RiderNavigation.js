import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Riders from '../screens/Rider/Groups/Riders';
import NewRider from '../screens/Rider/Groups/Riders/New';
import EditRider from '../screens/Rider/Groups/Riders/Edit';
import Groups from '../screens/Rider/Groups/Groups';
import NewGroup from '../screens/Rider/Groups/Groups/New';
import EditGroup from '../screens/Rider/Groups/Groups/Edit';
import ImportRider from '../screens/Rider/Groups/Groups/ImportRider';
import AppNavigation from './AppNavigation';
import Home from '../screens/Rider/Home';
import SelectAddress from '../screens/Rider/SelectAddress';
import AddressDetails from '../screens/Rider/AddressDetails';
import { SafeAreaView, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { HelpButton, HelpButtonText } from '../components/Form/Elements';

const defaultNavigationOptions = {
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

const RiderStack = createStackNavigator(
  {
    Riders: { screen: Riders },
    NewRider: { screen: NewRider },
    EditRider: { screen: EditRider }
  },
  {
    initialRouteName: 'Riders',
    defaultNavigationOptions
  }
);

const GroupStack = createStackNavigator(
  {
    Groups: { screen: Groups },
    NewGroup: { screen: NewGroup },
    EditGroup: { screen: EditGroup },
    ImportRider: { screen: ImportRider }
  },
  {
    initialRouteName: 'Groups',
    defaultNavigationOptions
  }
);

const RequestStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
        drawerLabel: () => null
      }
    },
    SelectAddress: { screen: SelectAddress, navigationOptions: { headerShown: false } },
    AddressDetails: { screen: AddressDetails, navigationOptions: { headerShown: false } }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions
  }
);

const RiderNavigation = createDrawerNavigator(
  {
    'Request Ride': { screen: RequestStack },
    'My Riders': { screen: RiderStack },
    'My Groups': { screen: GroupStack }
  },
  {
    contentComponent: props => (
      <View>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />

          <HelpButton
            onPress={() => props.navigation.navigate('Initial', { userType: null })}
            titleStyle={{
              color: '#5280e2',
              textDecorationLine: 'underline'
            }}>
            <HelpButtonText>Sign out</HelpButtonText>
          </HelpButton>
        </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

export default RiderNavigation;
