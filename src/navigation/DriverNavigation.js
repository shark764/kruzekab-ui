import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Rider/Home';
import Riders from '../screens/Rider/Groups/Riders';
import NewRider from '../screens/Rider/Groups/Riders/New';
import EditRider from '../screens/Rider/Groups/Riders/Edit';

const DriverNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Riders: { screen: Riders },
    NewRider: { screen: NewRider },
    EditRider: { screen: EditRider },
  },
  {
    initialRouteName: 'Riders',
  },
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
