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
import PasswordChanged from '../screens/Authentication/ForgotPassword/PasswordChanged';

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
    PasswordChanged: { screen: PasswordChanged },
    Confirm: { screen: Confirmation }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerTitle: () => null,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      }
    }
    // headerMode: 'none'
  }
);

export default AuthNavigation;
