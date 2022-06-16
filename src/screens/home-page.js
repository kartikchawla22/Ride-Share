import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button'
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

const HomePage = () => {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <PageHeader config={config.header}></PageHeader>
            </View>
            <View>
                <Image style={styles.logostyle} source={require('./../Assets/Logo.jpeg')} />
            </View>
            <View style={styles.buttonsContainer}><CustomButton config={config.searchForRide}></CustomButton></View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.buttonsContainer}><CustomButton config={config.shareYourRide}></CustomButton></View>
        </View>
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
        fontSize: 70,
        fontWeight: "700",
        opacity: 0.5
    }
})
export default HomePage;
