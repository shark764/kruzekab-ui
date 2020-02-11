import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Rider/Home';
import FamilyGroup from '../screens/Rider/Groups/Family';

const DriverNavigation = createStackNavigator(
  {
    Home: { screen: Home }
    // FamilyGroup: { screen: FamilyGroup }
  },
  {
    initialRouteName: 'Home'
  }
);

// const DriverNavigation = createDrawerNavigator(
//   // Stack: { screen: Stack }
//   {
//     Home: { screen: Home }
//   },
//   {
//     initialRouteName: 'Home'
//   }
// );

export default DriverNavigation;
