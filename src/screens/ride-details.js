import React from 'react';
import { Text, StyleSheet, View, Image, SafeAreaView } from 'react-native';
import PageHeader from '../components/pageHeader';
import { CSS_CONSTANTS } from '../utils/css-contants';
import firestore, { firebase } from '@react-native-firebase/firestore';
import CustomButton from '../components/button';
import auth from '@react-native-firebase/auth';
import { CONSTANTS } from '../utils/contants';

const config = {
    header: {
        title: 'Ride Details',
        closeButton: true,
    },
    bookRideButton: {
        buttonText: 'Book Ride',
        roundedButton: true,
    },
};

const RideDetails = ({ navigation, route }) => {
    const { ride } = route.params;
    console.log(ride);
    const bookRide = () => {
        // Save to firebase
        const booking = firestore().collection(CONSTANTS.USER_COLLECTION).doc(auth().currentUser.uid);
        ride.bookedBy.push(booking)
        firestore()
            .collection(CONSTANTS.RIDES_COLLECTION).doc(ride.rideID).update({
                bookedBy: ride.bookedBy
            })
        console.log(ride.bookedBy);
    }
    return (
        <SafeAreaView>
            <PageHeader navigation={navigation} config={config.header}></PageHeader>
            <View style={styles.container}>
                <Image style={styles.userprofile} source={require('../Assets/userprofile.png')}></Image>
                <Text style={styles.textStyle}>{ride.createdByUserName}</Text>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>From: {ride.leavingFrom}</Text>
                    <Text style={styles.textStyle}>To: {ride.goingTo}</Text>
                    <Text style={styles.textStyle}>Date: {ride.dateOfTravel.toDate().toDateString()}</Text>
                    <Text style={styles.textStyle}>Number Plate: {ride.vehicleNumber}</Text>
                    <Text style={styles.textStyle}>Price Per Rider: ${ride.pricePerRider}</Text>
                </View>
                <View style={styles.buttonsContainer}><CustomButton onPress={bookRide} config={config.bookRideButton}></CustomButton></View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userprofile: {
        width: '30%',
        height: 100,
        marginTop: 20,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    textView: {
        backgroundColor: CSS_CONSTANTS.GREY_BACKGROUND,
        width: '100%',
        justifyContent: 'flex-start',
        margin: 30,
        padding: 10,
    },
    buttonsContainer: {
        alignItems: 'center',
        marginTop: '20%',
        width: '100%',
    },
});
export default RideDetails;
