/**
 * @format
 */
import {Navigation} from 'react-native-navigation';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';

import App from './App';

Navigation.registerComponent('Splash', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  const options = {
    topBar: {
      visible: false,
      statusbar: {visible: false},
    },
  };
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Splash',
            },
          },
        ],
        options: options,
      },
    },
  });
});
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('app', () => App);
