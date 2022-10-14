import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';
import RideCard from '../components/RideCard';

const config = {
  ride1: {
    LeavingCity: 'Barrie',
    GoingTo: 'Toronto',
    DateTime: '20 June 2022 5 pm',
  },
  ride2: {
    LeavingCity: 'Toronto',
    GoingTo: 'Barrie',
    DateTime: '18 June 2022 7 pm',
  },
  ride3: {
    LeavingCity: 'Toronto',
    GoingTo: 'Barrie',
    DateTime: '17 June 2022 7 pm',
  },
  ride4: {
    LeavingCity: 'Toronto',
    GoingTo: 'Barrie',
    DateTime: '16 June 2022 7 pm',
  },
};

const RideList = () => {
  return (
    <SafeAreaView>
      <RideCard style={styles.component} config={config.ride1}></RideCard>
      <RideCard style={styles.component} config={config.ride2}></RideCard>
      <RideCard style={styles.component} config={config.ride3}></RideCard>
      <RideCard style={styles.component} config={config.ride4}></RideCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: CSS_CONSTANTS.COLOR_PRIMARY,
  },
  component: {
    backgroundColor: CSS_CONSTANTS.GREY_BACKGROUND,
  },
});

export default RideList;
