import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../screens/home-page';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfilePage from '../screens/profilePage';
import RideList from '../screens/RideList';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

const DrawerNavigationDelegate = ({ navigation, route }) => {
  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      });

  };
  const { params } = route;
  return (
    <SafeAreaProvider>
      <Drawer.Navigator
        useLegacyImplementation={true}
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          title: '',
          headerTitleStyle: {
            fontWeight: '300',
            fontSize: 25,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={HomePage}
          options={{
            drawerLabel: 'Home',
            title: 'Ride Share',
          }}
          initialParams={params}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            drawerLabel: 'Profile',
            title: 'Your Profile',
          }}
          initialParams={params}
        />
        <Drawer.Screen
          name="YourRides"
          component={RideList}
          options={{
            drawerLabel: 'Your Rides',
            title: 'Your Rides',
          }}
          initialParams={params}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            drawerLabel: 'Logout',
          }}
        />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};
export default DrawerNavigationDelegate;
