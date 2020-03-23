import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Initial from '../screens/Initial';
import AuthNavigation from './AuthNavigation';
import RiderNavigation from './RiderNavigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial,
    Auth: AuthNavigation,
    // App: AppNavigation
    Rider: RiderNavigation,
    // Driver: DriverNavigation
  },
  {
    // initialRouteName: 'Rider',
    initialRouteName: 'Initial',
    // initialRouteName: 'Auth'
  },
);

const AppNavigator = createAppContainer(SwitchNavigator);

export default AppNavigator;
