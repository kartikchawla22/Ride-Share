/**
 * Ride Share
 * https://github.com/kartikchawla22/Ride-Share/
 *
 */

import React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StatusBar,
  useColorScheme
} from 'react-native';

import LoginPage from './src/screens/Loginpage';
import SignupPage from './src/screens/signup-page';
import HomePage from './src/screens/home-page';
import ConfirmationPage from './src/screens/confirmation-page';
import ShareYourRidePage from './src/screens/share-your-ride-page';
const Stack = createNativeStackNavigator();
const App: () => Node = () => {


  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#FFFFFF'
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ShareYourRide" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="SignUp" component={SignupPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Confirmation" component={ConfirmationPage} />
          <Stack.Screen name="ShareYourRide" component={ShareYourRidePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
    //     <SafeAreaView style={backgroundStyle}>

    //        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //  </SafeAreaView>