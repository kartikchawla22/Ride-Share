/**
 * Ride Share
 * https://github.com/kartikchawla22/Ride-Share/
 *
 */

import 'react-native-gesture-handler';
import React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StatusBar,
  useColorScheme
} from 'react-native';

import LoginPage from './src/screens/Loginpage';
import SignupPage from './src/screens/signup-page';
import HomePage from './src/screens/home-page';
import ConfirmationPage from './src/screens/confirmation-page';
import ShareYourRidePage from './src/screens/share-your-ride-page';
import DrawerNavigationDelegate from './src/utils/drawer-navigation-delegate';
const Stack = createStackNavigator();
const App: () => Node = () => {


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignupPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Confirmation" component={ConfirmationPage} />
          <Stack.Screen name="DrawerNavigationDelegate" component={DrawerNavigationDelegate} />
          <Stack.Screen name="ShareYourRide" component={ShareYourRidePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;