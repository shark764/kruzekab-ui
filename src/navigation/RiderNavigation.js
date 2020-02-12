import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Rider/Home';
import Riders from '../screens/Rider/Groups/Riders';
import NewRider from '../screens/Rider/Groups/Riders/New';
import EditRider from '../screens/Rider/Groups/Riders/Edit';
import Groups from '../screens/Rider/Groups/Groups';
import NewGroup from '../screens/Rider/Groups/Groups/New';
import EditGroup from '../screens/Rider/Groups/Groups/Edit';

const RiderNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Riders: { screen: Riders },
    NewRider: { screen: NewRider },
    EditRider: { screen: EditRider },
    Groups: { screen: Groups },
    NewGroup: { screen: NewGroup },
    EditGroup: { screen: EditGroup }
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
