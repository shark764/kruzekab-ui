import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
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

const RiderStack = createStackNavigator(
  {
    Riders: { screen: Riders },
    NewRider: { screen: NewRider },
    EditRider: { screen: EditRider }
  },
  {
    initialRouteName: 'Riders'
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
    initialRouteName: 'Groups'
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
    initialRouteName: 'Home'
  }
);

const RiderNavigation = createDrawerNavigator({
  'Request Ride': { screen: RequestStack },
  'My Riders': { screen: RiderStack },
  'My Groups': { screen: GroupStack }
});

export default RiderNavigation;
