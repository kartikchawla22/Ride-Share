import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button';
import { CSS_CONSTANTS } from '../utils/css-contants';
import { validate } from '../utils/validation-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from '../components/date-picker';
import DropdownComponent from '../components/dropdown';
import { CONSTANTS } from '../utils/contants';
import { ScrollView } from 'react-native-gesture-handler';

const config = {
  fields: {
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
  },
  header: {
    title: 'Search Your Ride',
    closeButton: true,
  },
  searchButton: {
    buttonText: 'Search',
    roundedButton: true,
  },
};
let formSubmitted = false;

const SearchRide = ({ navigation, route }) => {
  const [leavingFrom, onLeavingFromChange] = React.useState(leavingFrom);
  const [goingTo, onGoingToChange] = React.useState(goingTo);
  const [dateOfTravel, onDateOfTravelChange] = React.useState(new Date());

  const [leavingFromError, setLeavingFromError] = React.useState(leavingFromError);
  const [goingToError, setGoingToError] = React.useState(goingToError);
  const [dateOfTravelError, setDateOfTravelError] = React.useState(dateOfTravelError);

  const checkValidation = () => {
    Keyboard.dismiss();
    setLeavingFromError(validate('leavingFrom', leavingFrom));
    setGoingToError(validate('goingTo', goingTo));
    setDateOfTravelError(validate('dateOfTravel', dateOfTravel));
    formSubmitted = true;

    if (!leavingFrom || !goingTo || !dateOfTravel) {
      return;
    }

    if (!leavingFromError && !goingToError && !dateOfTravelError) {
      navigation.navigate('SearchList', { leavingFrom, goingTo, dateOfTravel: dateOfTravel.toDateString() });
    }
  };

  React.useEffect(() => {
    formSubmitted = false;
  }, [route]);

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
    if (dateOfTravel === '' || !dateOfTravel) {
      onDateOfTravelChange(null);
    }
    else {
      setDateOfTravelError(validate('dateOfTravel', dateOfTravel));
    }
  }, [dateOfTravel]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <PageHeader navigation={navigation} config={config.header}></PageHeader>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View>
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
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={checkValidation}
          config={config.searchButton}></CustomButton>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    display: 'flex',
    height: '100%',
  },
  container: {
    width: '100%',
    display: 'flex',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    width: '100%',
  },
  buttonsContainer: {
    display: 'flex',
    height: '10%',
    alignItems: 'center',
    marginTop: 300,
    width: '100%',
  },
});

export default SearchRide;
