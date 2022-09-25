import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const SplashScreen = ({ navigation }) => {

    React.useEffect(() => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Login', params: { APPCONFIG: result } }
            ],
        })
    }, []);

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

