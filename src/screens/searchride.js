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
import { ScrollView } from 'react-native-gesture-handler';



const config = {
    fields: {
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
    },
    header: {
        title: "Search Your Ride",
        closeButton: true
    },
    searchButton: {
        buttonText: 'Search',
        roundedButton: true
    }
}
let formSubmitted = false;


const SearchRide =({ navigation, route })=>{
       
        const [leavingFrom, onLeavingFromChange] = React.useState(leavingFrom);
        const [goingTo, onGoingToChange] = React.useState(goingTo);
        const [dateOfTravel, onDateOfTravelChange] = React.useState(dateOfTravel);
       
       
        const [leavingFromError, setLeavingFromError] = React.useState(leavingFromError);
        const [goingToError, setGoingToError] = React.useState(goingToError);
        const [dateOfTravelError, setDateOfTravelError] = React.useState(dateOfTravelError);

        const checkValidation = () => {
            Keyboard.dismiss();
            setLeavingFromError(validate('leavingFrom', leavingFrom))
            setGoingToError(validate('goingTo', goingTo))
            setDateOfTravelError(validate('dateOfTravel', dateOfTravel))
            formSubmitted = true
            if ( !leavingFromError
                && !goingToError
                && !dateOfTravelError
                ) {
                // navigation.navigate('Confirmation');
            }
        }
    
        React.useEffect(() => {
            formSubmitted = false;
        }, [route]);

        React.useEffect(() => {
            if (leavingFrom === null) {
                onLeavingFromChange(null)
            }
            if (formSubmitted) {
                setLeavingFromError(validate('leavingFrom', leavingFrom))
            }
        }, [leavingFrom]);
    
    
        React.useEffect(() => {
            if (goingTo === null) {
                onGoingToChange(null)
            }
            if (formSubmitted) {
                setGoingToError(validate('goingTo', goingTo))
            }
        }, [goingTo]);

        React.useEffect(() => {
            if (dateOfTravel === "") {
                onPricePerRiderChange(null)
            }
            if (formSubmitted) {
                setDateOfTravelError(validate('dateOfTravel', dateOfTravel))
            }
        }, [dateOfTravel]);
   
        return (
            <SafeAreaView>
                <View style={styles.header}>
                    <PageHeader navigation={navigation} config={config.header}></PageHeader>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <DropdownComponent config={config.fields.leavingFrom} options={CONSTANTS.ONTARIO_CITIES} onValueChange={onLeavingFromChange} errorMessage={leavingFromError}></DropdownComponent>
                            <DropdownComponent config={config.fields.goingTo} options={CONSTANTS.ONTARIO_CITIES} onValueChange={onGoingToChange} errorMessage={goingToError}></DropdownComponent>
                            <DatePickerComponent config={config.fields.dateOfTravel} onDateChange={onDateOfTravelChange} errorMessage={dateOfTravelError} date={dateOfTravel}></DatePickerComponent>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.buttonsContainer}><CustomButton onPress={checkValidation} config={config.searchButton}></CustomButton></View>
            </SafeAreaView>
        );
    }
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            display: "flex",
            alignItems: 'center',
            justifyContent: "center"
        },
        header: {
            marginBottom: 30,
            width: "100%"
        },
        buttonsContainer: {
            alignItems: "center",
            marginTop: 300,
            width: "100%"
        }
    })

export default SearchRide;