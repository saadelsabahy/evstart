/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PushNotificationConfigration} from './src/utils/PushNotificationConfig';
PushNotificationConfigration();
AppRegistry.registerComponent(appName, () => App);
