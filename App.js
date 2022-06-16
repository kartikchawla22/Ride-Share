/**
 * Ride Share
 * https://github.com/kartikchawla22/Ride-Share/
 *
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';

import LoginPage from './src/screens/Loginpage';
import SignupPage from './src/screens/signup-page';
import HomePage from './src/screens/home-page';
import ConfirmationPage from './src/screens/confirmation-page';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#FFFFFF'
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <SignupPage></SignupPage> */}
      <LoginPage></LoginPage>
      {/* <HomePage></HomePage> */}
      {/* <ConfirmationPage message="adPostedSuccesfully"></ConfirmationPage> */}
    </SafeAreaView>
  );
};

export default App;
