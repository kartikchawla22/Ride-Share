import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';

const RideCard = props => {
  const { config } = props;
  return (
    <View style={styles.rideCard}>
      <Image
        style={styles.rideImage}
        source={require('./../Assets/carRide.png')}
      />
      <View style={styles.textView}>
        <Text style={styles.textStyle}>From : {config.LeavingCity}</Text>
        <Text style={styles.textStyle}> To : {config.GoingTo}</Text>
        <Text style={styles.textStyle}> {config.DateTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rideCard: {
    width: '90%',
    height: 128,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,

    backgroundColor: CSS_CONSTANTS.GREY_BACKGROUND,
    borderRadius: 20,
  },
  rideImage: {
    height: 91,
    width: '30%',
    margin: 10,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  textView: {
    justifyContent: 'center',
    margin: 30,
    alignItems: 'flex-start',
  },
});
export default RideCard;
