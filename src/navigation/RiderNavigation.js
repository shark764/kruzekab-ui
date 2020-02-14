import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Rider/Home';
import Riders from '../screens/Rider/Groups/Riders';
import NewRider from '../screens/Rider/Groups/Riders/New';
import EditRider from '../screens/Rider/Groups/Riders/Edit';
import Groups from '../screens/Rider/Groups/Groups';
import NewGroup from '../screens/Rider/Groups/Groups/New';
import EditGroup from '../screens/Rider/Groups/Groups/Edit';
import SelectAddress from '../screens/Rider/SelectAddress';
import AddressDetails from '../screens/Rider/AddressDetails';

const RiderNavigation = createStackNavigator(
  {
    Home: { screen: Home, navigationOptions: { headerShown: false} },
    Riders: { screen: Riders },
    NewRider: { screen: NewRider },
    EditRider: { screen: EditRider },
    Groups: { screen: Groups },
    NewGroup: { screen: NewGroup },
    EditGroup: { screen: EditGroup },
    SelectAddress: { screen: SelectAddress, navigationOptions: { headerShown: false}},
    AddressDetails: { screen: AddressDetails, navigationOptions: { headerShown: false}}
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
