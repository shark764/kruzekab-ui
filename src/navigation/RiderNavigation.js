import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, View, Image } from 'react-native';
import Riders from '../screens/Rider/Groups/Riders';
import NewRider from '../screens/Rider/Groups/Riders/New';
import EditRider from '../screens/Rider/Groups/Riders/Edit';
import Groups from '../screens/Rider/Groups/Groups';
import NewGroup from '../screens/Rider/Groups/Groups/New';
import EditGroup from '../screens/Rider/Groups/Groups/Edit';
import ImportRider from '../screens/Rider/Groups/Groups/ImportRider';
import Home from '../screens/Rider/Home';
import SelectAddress from '../screens/Rider/SelectAddress';
import AddressDetails from '../screens/Rider/AddressDetails';
import { HelpButton, HelpButtonText } from '../components/Form/Elements';
import SelectGroup from '../screens/Rider/Ride/SelectGroup';
import SelectRiders from '../screens/Rider/Ride/SelectRiders';
import RideAccepted from '../screens/Rider/Ride/RideAccepted';
import RideArrived from '../screens/Rider/Ride/RideArrived';
import RideOnTrip from '../screens/Rider/Ride/RideOnTrip';
import Streaming from '../screens/Rider/Ride/Streaming';
import RideFinished from '../screens/Rider/Ride/RideFinished';
import ParentAccess from '../screens/Rider/Groups/Groups/ImportRider/ParentAccess';
import SelectExternalRiders from '../screens/Rider/Groups/Groups/ImportRider/SelectExternalRiders';
import AddRiders from '../screens/Rider/Groups/Groups/AddRiders';
import AddressMapPreview from '../screens/Rider/AddressMapPreview';

const defaultNavigationOptions = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
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
    justifyContent: 'center',
  },
  headerLayoutPreset: 'center',
};

const RiderStack = createStackNavigator(
  {
    Riders: { screen: Riders },
    NewRider: { screen: NewRider },
    EditRider: { screen: EditRider },
  },
  {
    initialRouteName: 'Riders',
    defaultNavigationOptions,
  },
);

const GroupStack = createStackNavigator(
  {
    Groups: { screen: Groups },
    NewGroup: { screen: NewGroup },
    EditGroup: { screen: EditGroup },
    ImportRider: { screen: ImportRider },
    AddRiders: { screen: AddRiders },
    ParentAccess: { screen: ParentAccess },
    SelectExternalRiders: { screen: SelectExternalRiders },
  },
  {
    initialRouteName: 'Groups',
    defaultNavigationOptions,
  },
);

const RequestStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
        drawerLabel: () => null,
      },
    },
    SelectAddress: { screen: SelectAddress, navigationOptions: { headerShown: false } },
    AddressDetails: { screen: AddressDetails, navigationOptions: { headerShown: false } },
    SelectGroup: { screen: SelectGroup },
    SelectRiders: { screen: SelectRiders },
    RideAccepted: { screen: RideAccepted },
    RideArrived: { screen: RideArrived },
    RideOnTrip: { screen: RideOnTrip },
    Streaming: { screen: Streaming, navigationOptions: { headerShown: false } },
    RideFinished: { screen: RideFinished },
    AddressMapPreview: { screen: AddressMapPreview, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: 'Home',
    // initialRouteName: 'Groups',
    defaultNavigationOptions,
  },
);

const RiderNavigation = createDrawerNavigator(
  {
    Ride: { screen: RequestStack },
    'My Riders': { screen: RiderStack },
    'My Groups': { screen: GroupStack },
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
              textDecorationLine: 'underline',
            }}
          >
            <HelpButtonText>Sign out</HelpButtonText>
          </HelpButton>
        </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
);

export default RiderNavigation;
