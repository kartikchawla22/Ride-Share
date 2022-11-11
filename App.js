/**
 * Ride Share
 * https://github.com/kartikchawla22/Ride-Share/
 *
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

import LoginPage from './src/screens/Loginpage';
import SignupPage from './src/screens/signup-page';
import HomePage from './src/screens/home-page';
import ConfirmationPage from './src/screens/confirmation-page';
import SearchRide from './src/screens/searchride';
import DrawerNavigationDelegate from './src/utils/drawer-navigation-delegate';
import ShareYourRidePage from './src/screens/share-your-ride-page';
import profilePage from './src/screens/profilePage';
import EditProfile from './src/screens/EditProfile';
import RideList from './src/screens/RideList';
import SearchList from './src/screens/SearchList';
import SplashScreen from './src/screens/SplashScreen';

import auth from '@react-native-firebase/auth';
import ForgotPasswordPage from './src/screens/forgot-password';
import {
  requestUserPermission,
  notificationListener,
} from './src/utils/push-notification-helper';
import RideDetails from './src/screens/ride-details';
import mobileAds, {MaxAdContentRating} from 'react-native-google-mobile-ads';

const Stack = createStackNavigator();
const App: () => Node = ({navigation}) => {
  let initialRouteName = 'Login';

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  mobileAds()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,
      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
      // An array of test device IDs to allow.
      testDeviceIdentifiers: ['EMULATOR'],
    })
    .then(() => {
      // Request config successfully set!
      console.log('request config successfully set');
    });

  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      // Initialization complete!
      console.log('Mobile Ads are initialized');
    });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    initialRouteName = 'Login';
  } else {
    initialRouteName = 'DrawerNavigationDelegate';
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignupPage} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Confirmation" component={ConfirmationPage} />
          <Stack.Screen name="SearchRide" component={SearchRide} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
          <Stack.Screen
            name="DrawerNavigationDelegate"
            component={DrawerNavigationDelegate}
          />
          <Stack.Screen name="ShareYourRide" component={ShareYourRidePage} />
          <Stack.Screen name="Profile" component={profilePage} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="RideList" component={RideList} />
          <Stack.Screen name="SearchList" component={SearchList} />
          <Stack.Screen name="RideDetails" component={RideDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
