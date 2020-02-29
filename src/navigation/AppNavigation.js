import { createStackNavigator } from 'react-navigation-stack';
import RiderNavigation from './RiderNavigation';

const AppNavigation = createStackNavigator(
  {
    Rider: RiderNavigation,
  },
  {
    initialRouteName: 'Home',
  },
);

export default AppNavigation;
