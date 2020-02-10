import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/Rider/Home';

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home, navigationOptions: { headerShown: false} },
  },
  {
    initialRouteName: 'Home'
  }
);

// const AppNavigation = createDrawerNavigator(
//   // Stack: { screen: Stack }
//   {
//     Home: { screen: Home }
//   },
//   {
//     initialRouteName: 'Home'
//   }
// );

export default AppNavigation;
