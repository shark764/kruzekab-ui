import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Rider/Home';
import FamilyGroup from '../screens/Rider/Groups/Family';

const RiderNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    FamilyGroup: { screen: FamilyGroup }
  },
  {
    initialRouteName: 'Home'
  }
);

// const RiderNavigation = createDrawerNavigator(
//   // Stack: { screen: Stack }
//   {
//     Home: { screen: Home }
//   },
//   {
//     initialRouteName: 'Home'
//   }
// );

export default RiderNavigation;
