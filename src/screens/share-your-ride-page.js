import React from 'react';
import { View, StyleSheet, Keyboard, Alert } from 'react-native';
import Input from '../components/input';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button';
import { CSS_CONSTANTS } from '../utils/css-contants';
import { validate } from '../utils/validation-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from '../components/date-picker';
import DropdownComponent from '../components/dropdown';
import { CONSTANTS } from '../utils/contants';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const config = {
  fields: {
    vehicleNumber: {
      placeholder: 'Enter Your Vehicle Number',
      type: 'text',
    },
    leavingFrom: {
      placeholder: {
        label: 'Leaving From',
        value: null,
        color: CSS_CONSTANTS.ERROR_COLOR,
      },
    },
    goingTo: {
      placeholder: {
        label: 'Going To',
        value: null,
        color: CSS_CONSTANTS.ERROR_COLOR,
      },
    },
    dateOfTravel: {
      placeholder: 'Date and time of travel',
      type: 'date',
    },
    numberOfPassengersAllowed: {
      placeholder: 'Number Of Passengers Allowed',
      type: 'number',
      keyboardType: 'numeric',
    },
    pricePerRider: {
      placeholder: 'Price Per Rider',
      type: 'number',
      keyboardType: 'numeric',
    },
  },
  header: {
    title: 'Share Your Ride',
    closeButton: true,
  },
  submitButton: {
    buttonText: 'Submit',
    roundedButton: true,
  },
};
let formSubmitted = false;

const ShareYourRidePage = ({ navigation, route }) => {
  const [vehicleNumber, onVehicleNumberChange] = React.useState(vehicleNumber);
  const [leavingFrom, onLeavingFromChange] = React.useState(leavingFrom);
  const [goingTo, onGoingToChange] = React.useState(goingTo);
  const [dateOfTravel, onDateOfTravelChange] = React.useState(new Date());
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
    setVehicleNumberError(validate('vehicleNumber', vehicleNumber));
    setLeavingFromError(validate('leavingFrom', leavingFrom));
    setGoingToError(validate('goingTo', goingTo));
    setDateOfTravelError(validate('dateOfTravel', dateOfTravel));
    setNumberOfPassengersAllowedError(
      validate('numberOfPassengersAllowed', numberOfPassengersAllowed),
    );
    setPricePerRiderError(validate('pricePerRider', pricePerRider));
    formSubmitted = true;
    if (!leavingFrom || !goingTo || !dateOfTravel || !vehicleNumber || !numberOfPassengersAllowed || !pricePerRider) {
      return;
    }

    if (!vehicleNumberError && !leavingFromError && !goingToError && !dateOfTravelError && !numberOfPassengersAllowedError && !pricePerRiderError) {
      firestore()
        .collection(CONSTANTS.RIDES_COLLECTION)
        .add({
          leavingFrom,
          goingTo,
          dateOfTravel: firestore.Timestamp.fromDate(new Date(dateOfTravel.toDateString())),
          vehicleNumber,
          numberOfPassengersAllowed,
          pricePerRider,
          createdByUserEmail: auth().currentUser.email,
          createdByUserName: auth().currentUser.displayName,
          createdByUid: auth().currentUser.uid,
          bookedBy: []
        })
        .then((res) => {
          Alert.alert('Congratulations', 'Your Ad is posted sucessfully', [
            {
              Text: 'Ok',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'DrawerNavigationDelegate' }],
                });
              },
            },
          ]);
        })
    }
  };

  React.useEffect(() => {
    formSubmitted = false;
  }, [route]);

  React.useEffect(() => {
    if (vehicleNumber === '' || !vehicleNumber) {
      onVehicleNumberChange(null);
    }
    else {
      setVehicleNumberError(validate('vehicleNumber', vehicleNumber));
    }
  }, [vehicleNumber]);

  React.useEffect(() => {
    if (leavingFrom === null || !leavingFrom) {
      onLeavingFromChange(null);
    }
    else {
      setLeavingFromError(validate('leavingFrom', leavingFrom));
    }
  }, [leavingFrom]);

  React.useEffect(() => {
    if (goingTo === null || !goingTo) {
      onGoingToChange(null);
    }
    else {
      setGoingToError(validate('goingTo', goingTo));
    }
  }, [goingTo]);

  React.useEffect(() => {
    if (numberOfPassengersAllowed === '' || !numberOfPassengersAllowed) {
      onNumberOfPassengersAllowedChange(null);
    }
    else {
      setNumberOfPassengersAllowedError(
        validate('numberOfPassengersAllowed', numberOfPassengersAllowed),
      );
    }
  }, [numberOfPassengersAllowed]);

  React.useEffect(() => {
    if (pricePerRider === '' || !pricePerRider) {
      onPricePerRiderChange(null);
    }
    else {
      setPricePerRiderError(validate('pricePerRider', pricePerRider));
    }
  }, [pricePerRider]);

  React.useEffect(() => {
    if (dateOfTravel === '' || !dateOfTravel) {
      onPricePerRiderChange(null);
    }
    else {
      setDateOfTravelError(validate('dateOfTravel', dateOfTravel));
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
            <Input
              config={config.fields.vehicleNumber}
              onChangeText={onVehicleNumberChange}
              errorMessage={vehicleNumberError}></Input>
            <DropdownComponent
              config={config.fields.leavingFrom}
              value={leavingFrom}
              options={CONSTANTS.ONTARIO_CITIES.filter(
                c => c.value !== goingTo,
              )}
              onValueChange={onLeavingFromChange}
              errorMessage={leavingFromError}></DropdownComponent>
            <DropdownComponent
              config={config.fields.goingTo}
              value={goingTo}
              options={CONSTANTS.ONTARIO_CITIES.filter(
                c => c.value !== leavingFrom,
              )}
              onValueChange={onGoingToChange}
              errorMessage={goingToError}></DropdownComponent>
            <DatePickerComponent
              config={config.fields.dateOfTravel}
              onDateChange={onDateOfTravelChange}
              errorMessage={dateOfTravelError}
              date={dateOfTravel}></DatePickerComponent>
            <Input
              config={config.fields.numberOfPassengersAllowed}
              onChangeText={onNumberOfPassengersAllowedChange}
              errorMessage={numberOfPassengersAllowedError}></Input>
            <Input
              config={config.fields.pricePerRider}
              onChangeText={onPricePerRiderChange}
              errorMessage={pricePerRiderError}></Input>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={checkValidation}
          config={config.submitButton}></CustomButton>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    width: '100%',
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
});
export default ShareYourRidePage;
