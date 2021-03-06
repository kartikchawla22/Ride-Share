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

import { StatusBar, useColorScheme } from 'react-native';

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

const Stack = createStackNavigator();
const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignupPage} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Confirmation" component={ConfirmationPage} />
          <Stack.Screen name="SearchRide" component={SearchRide} />
          <Stack.Screen
            name="DrawerNavigationDelegate"
            component={DrawerNavigationDelegate}
          />
          <Stack.Screen name="ShareYourRide" component={ShareYourRidePage} />
          <Stack.Screen name="Profile" component={profilePage} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="RideList" component={RideList} />
          <Stack.Screen name="SearchList" component={SearchList} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
