import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import CustomButton from '../components/button'
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const config = {
    header: {
        title: "Home Page",
        burgerButton: true

    },
    searchForRide: {
        buttonText: 'Search For a Ride'
    },
    shareYourRide: {
        buttonText: 'Share Your Ride'
    }
}

const HomePage = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Image style={styles.logostyle} source={require('./../Assets/Logo.png')} />
                </View>
                <View style={styles.buttonsContainer}><CustomButton config={config.searchForRide} onPress={() => { navigation.navigate('SearchRide') }}></CustomButton></View>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.buttonsContainer}><CustomButton onPress={() => { navigation.navigate('ShareYourRide') }} config={config.shareYourRide}></CustomButton></View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        alignItems: 'center',
    },
    header: {
        marginBottom: 65,
        width: "100%"
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 110,
        width: "100%"
    },
    logostyle: {
        width: 150,
        height: 150
    },
    orText: {
        marginTop: 60,
        marginBottom: -50,
        fontSize: 50,
        fontWeight: "700",
        opacity: 0.5
    }
})
export default HomePage;

