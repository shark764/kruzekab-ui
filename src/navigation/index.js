import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Initial from '../screens/Initial';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import RiderNavigation from './RiderNavigation';
import DriverNavigation from './DriverNavigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    // App: AppNavigation,
    Rider: RiderNavigation
    // Driver: DriverNavigation
  },
  {
    initialRouteName: 'Rider'
    // initialRouteName: 'Initial'
    // initialRouteName: 'Auth'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
