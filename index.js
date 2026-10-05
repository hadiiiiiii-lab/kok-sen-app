/**
 * React Native CLI Entrypoint
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import appConfig from './app.json';

const appName = appConfig.name || 'KokSenRestaurant';

AppRegistry.registerComponent(appName, () => App);
