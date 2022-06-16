import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PageHeader from '../components/pageHeader';
import { CSS_CONSTANTS } from '../utils/css-contants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const config = {
    header: {
        title: "Congratulations",
        closeButton: true
    }
}

const ConfirmationPage = (props) => {
    const confirmationText = {
        adPostedSuccesfully: 'Your advertisement has been posted successfully',
        rideConfirmed: 'Your ride has been confirmed'
    }
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <PageHeader config={config.header}></PageHeader>
            </View>
            <IconAntDesign style={styles.checkIcon}
                name='check'></IconAntDesign>
            <Text style={styles.confirmationText}>{confirmationText[props.message]}</Text>
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
    confirmationText: {
        marginTop: 150,
        fontSize: 40,
        fontWeight: "700",
        textAlign: "center"
    },
    checkIcon: {
        fontSize: 100,
        color: CSS_CONSTANTS.COLOR_PRIMARY
    }
})
export default ConfirmationPage;

