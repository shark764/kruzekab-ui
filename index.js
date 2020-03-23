/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Root from './Root';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Root));
