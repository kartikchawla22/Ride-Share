import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import Input from '../components/input';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';
import validate from '../utils/validation-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from '../components/date-picker';
import DropdownComponent from '../components/dropdown'
import { CONSTANTS } from '../utils/contants';


const config = {
    fields: {
        vehicleNumber: {
            placeholder: "Enter Your Vehicle Number",
            type: "text"
        },
        leavingFrom: {
            placeholder: {
                label: 'Leaving From',
                value: null,
                color: CSS_CONSTANTS.ERROR_COLOR
            }
        },
        goingTo: {
            placeholder: {
                label: 'Going To',
                value: null,
                color: CSS_CONSTANTS.ERROR_COLOR
            }
        },
        dateOfTravel: {
            placeholder: "Date and time of travel",
            type: "date"
        },
        numberOfPassengersAllowed: {
            placeholder: "Number Of Passengers Allowed",
            type: "number",
            keyboardType: 'numeric'
        },
        pricePerRider: {
            placeholder: "Price Per Rider",
            type: "number",
            keyboardType: 'numeric'
        },
    },
    header: {
        title: "Share Your Ride",
        closeButton: true
    },
    submitButton: {
        buttonText: 'Submit',
        roundedButton: true
    }
}
let formSubmitted = false;

const ShareYourRidePage = ({ navigation, route }) => {
    const [vehicleNumber, onVehicleNumberChange] = React.useState(vehicleNumber);
    const [leavingFrom, onLeavingFromChange] = React.useState(leavingFrom);
    const [goingTo, onGoingToChange] = React.useState(goingTo);
    const [dateOfTravel, onDateOfTravelChange] = React.useState(dateOfTravel);
    const [numberOfPassengersAllowed, onNumberOfPassengersAllowedChange] = React.useState(numberOfPassengersAllowed);
    const [pricePerRider, onPricePerRiderChange] = React.useState(pricePerRider);


    const [vehicleNumberError, setVehicleNumberError] = React.useState(vehicleNumberError);
    const [leavingFromError, setLeavingFromError] = React.useState(leavingFromError);
    const [goingToError, setGoingToError] = React.useState(goingToError);
    const [dateOfTravelError, setDateOfTravelError] = React.useState(dateOfTravelError);
    const [numberOfPassengersAllowedError, setNumberOfPassengersAllowedError] = React.useState(numberOfPassengersAllowedError);
    const [pricePerRiderError, setPricePerRiderError] = React.useState(pricePerRiderError);


    const checkValidation = () => {
        Keyboard.dismiss();
        setVehicleNumberError(validate('vehicleNumber', vehicleNumber))
        setLeavingFromError(validate('leavingFrom', leavingFrom))
        setGoingToError(validate('goingTo', goingTo))
        setDateOfTravelError(validate('dateOfTravel', dateOfTravel))
        setNumberOfPassengersAllowedError(validate('numberOfPassengersAllowed', numberOfPassengersAllowed))
        setPricePerRiderError(validate('pricePerRider', pricePerRider))
        formSubmitted = true
        console.log(vehicleNumberError);
        if (!vehicleNumberError
            && !leavingFromError
            && !goingToError
            && !dateOfTravelError
            && !numberOfPassengersAllowedError
            && !pricePerRiderError) {
            // navigation.navigate('Confirmation');
        }
    }



    React.useEffect(() => {
        formSubmitted = false;
    }, [route]);

    React.useEffect(() => {
        if (vehicleNumberError === "") {
            onVehicleNumberChange(null)
        }
        if (formSubmitted) {
            setVehicleNumberError(validate('vehicleNumber', vehicleNumber))
        }
    }, [vehicleNumberError]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <PageHeader navigation={navigation} config={config.header}></PageHeader>
                </View>
                <View >
                    <Input config={config.fields.vehicleNumber} onChangeText={onVehicleNumberChange} errorMessage={vehicleNumberError}></Input>
                    <DropdownComponent config={config.fields.leavingFrom} options={CONSTANTS.ONTARIO_CITIES} onValueChange={onLeavingFromChange} errorMessage={leavingFromError}></DropdownComponent>
                    <DropdownComponent config={config.fields.goingTo} options={CONSTANTS.ONTARIO_CITIES} onValueChange={onGoingToChange} errorMessage={goingToError}></DropdownComponent>
                    <DatePickerComponent config={config.fields.dateOfTravel} onChangeText={onDateOfTravelChange} errorMessage={dateOfTravelError}></DatePickerComponent>
                    <Input config={config.fields.numberOfPassengersAllowed} onChangeText={onNumberOfPassengersAllowedChange} errorMessage={numberOfPassengersAllowedError}></Input>
                    <Input config={config.fields.pricePerRider} onChangeText={onPricePerRiderChange} errorMessage={pricePerRiderError}></Input>
                </View>
                <View style={styles.buttonsContainer}><CustomButton onPress={checkValidation} config={config.submitButton}></CustomButton></View>
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
        marginBottom: 30,
        width: "100%"
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 50,
        width: "100%"
    }
})
export default ShareYourRidePage;