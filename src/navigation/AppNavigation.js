import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/Rider/Home';
import SelectAddress from '../screens/Rider/SelectAddress';
import AddressDetails from '../screens/Rider/AddressDetails';
import RiderNavigation from './RiderNavigation';

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home, navigationOptions: { headerShown: false } },
    Rider: RiderNavigation
  },
  {
    initialRouteName: 'Home'
  }
);

export default AppNavigation;
