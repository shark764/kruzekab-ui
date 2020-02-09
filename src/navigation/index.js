//index.js
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Initial from '../screens/Initial';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    App: AppNavigation
  },
  {
    initialRouteName: 'Initial'
    // initialRouteName: 'Auth'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
