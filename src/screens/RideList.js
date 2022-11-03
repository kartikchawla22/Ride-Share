import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text
} from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';
import RideCard from '../components/RideCard';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CONSTANTS } from '../utils/contants';


const RideList = () => {
  const [rides, setRides] = useState([]);
  useEffect(() => {
    firestore().collection(CONSTANTS.RIDES_COLLECTION).where('createdByUid', '==', auth().currentUser.uid).get().then((response) => {
      response.docs.forEach((ride) => {
        setRides(rides.concat({ ...ride.data(), dateOfTravel: ride.data().dateOfTravel.toDate().toDateString() }))
      })
    }).catch(e => console.log(e))
  }, [])
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {rides.length > 0 ?
          <FlatList
            data={rides}
            renderItem={({ item, index }) => (
              <RideCard ride={item} key={index} />
            )}
          /> : <Text style={styles.noDataText}>No Result Found</Text>
        }
      </View>
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
