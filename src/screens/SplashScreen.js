import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PageHeader from '../components/pageHeader';
import { CSS_CONSTANTS } from '../utils/css-contants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';



const SplashScreen = ({ navigation }) => {
    React.useEffect(() => {
        async function getConfig() {
            try {
                const response = await fetch(
                    'https://raw.githubusercontent.com/kartikchawla22/rideShareConfig/main/config.json'
                );
                const result = await response.json();
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Login', params: { APPCONFIG: result } }
                    ],
                })
            } catch (error) {
                alert(error)
            }
        }
        getConfig();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.container}>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default SplashScreen;

