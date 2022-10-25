import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
} from 'react-native';

const SearchCard = (props) => {
  const { ride } = props;
  return (
    <SafeAreaView style={styles.SearchCard}>
      <Image style={styles.userprofile} source={ride.profilePic ? ride.profilePic : require('../Assets/userprofile.png')}></Image>

      <View style={styles.textItems}>
        <Text style={styles.UserText}> {ride.createdByUserName} </Text>
        <Text style={styles.textstyle}> From : {ride.leavingFrom} </Text>
        <Text style={styles.textstyle}> To : {ride.goingTo} </Text>
        <Text style={styles.textstyle}> On: {ride.dateOfTravel.toDate().toDateString()} </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SearchCard: {
    width: '90%',
    height: 150,
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  userprofile: {
    width: '30%',
    height: 100,
    marginTop: 20,
  },
  textstyle: {
    fontSize: 16,
    marginBottom: 10,
  },
  textItems: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
  },
  UserText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
});

export default SearchCard;
