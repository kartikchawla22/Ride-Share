import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../screens/home-page';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Drawer = createDrawerNavigator();

const DrawerNavigationDelegate = ({ navigation }) => {
    const Logout = () => {
        React.useEffect(() => {
            navigation.reset({
                index: 0,
                routes: [
                    { name: "Login" }
                ],
            })
        }, []);
    }
    return (
        <SafeAreaProvider>
            <Drawer.Navigator
                useLegacyImplementation={true}
                initialRouteName='Home' screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "transparent",
                    },
                    title: "",

                }} >
                <Drawer.Screen name="Home" component={HomePage} options={{
                    drawerLabel: "Home",
                    title: "Ride Share"
                }} />
                <Drawer.Screen name="Logout" component={Logout} options={{
                    drawerLabel: "Logout"
                }} />

            </Drawer.Navigator>
        </SafeAreaProvider>
    )
}
export default DrawerNavigationDelegate;