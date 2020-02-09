//AuthNavigation.js
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Authentication/Login';
import Signup from '../screens/Rider/Signup';
import DriverSignup from '../screens/Driver/Signup';
import VehicleRegister from '../screens/Vehicle/VehicleRegister';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import Confirmation from '../screens/Authentication/Confirmation';
import DriverInformation from '../screens/Driver/Information';
import ProfilePhoto from '../screens/Driver/ProfilePhoto';
import ApplicationReviewed from '../screens/Driver/ApplicationReviewed';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    DriverSignup: { screen: DriverSignup },
    VehicleRegister: { screen: VehicleRegister },
    DriverInformation: { screen: DriverInformation },
    ProfilePhoto: { screen: ProfilePhoto },
    ApplicationReviewed: { screen: ApplicationReviewed },
    ForgotPassword: { screen: ForgotPassword },
    Confirm: { screen: Confirmation }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

export default AuthNavigation;
