import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';

const RideCard = props => {
  const { ride, isBooking } = props;
  return (
    <View style={styles.rideCard}>
      <Image
        style={styles.rideImage}
        source={require('./../Assets/carRide.png')}
      />
      <View style={styles.textView}>
        {isBooking && (<Text style={styles.textStyle}>Name: {ride.createdByUserName}</Text>)}
        <Text style={styles.textStyle}>From : {ride.leavingFrom}</Text>
        <Text style={styles.textStyle}>To : {ride.goingTo}</Text>
        <Text style={styles.textStyle}>{ride.dateOfTravel}</Text>
        {isBooking && (<Text style={styles.textStyle}>Price: {ride.pricePerRider}</Text>)}

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
