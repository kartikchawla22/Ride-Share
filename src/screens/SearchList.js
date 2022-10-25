import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import SearchCard from '../components/SearchCard';
import PageHeader from '../components/pageHeader';
import firestore from '@react-native-firebase/firestore';
import { CONSTANTS } from '../utils/contants';
import { Text, View, FlatList, StyleSheet } from 'react-native';


const config = {
  header: {
    title: 'Search Results',
    closeButton: true,
  },
};

const SearchList = ({ navigation, route }) => {
  const [rides, setRides] = useState([])
  let ridesResultArr = [];
  const { goingTo, leavingFrom, dateOfTravel } = route.params;
  if (!leavingFrom || !goingTo || !dateOfTravel) {
    navigation.goBack();
    return;
  }
  useEffect(() => {
    firestore()
      .collection(CONSTANTS.RIDES_COLLECTION)
      .where('goingTo', '==', goingTo)
      .where('leavingFrom', '==', leavingFrom)
      .where('dateOfTravel', '>=', firestore.Timestamp.fromDate(new Date(dateOfTravel)))
      .where('dateOfTravel', '<', firestore.Timestamp.fromDate(new Date(new Date(dateOfTravel).setUTCHours(23, 59, 59, 999))))
      .get()
      .then((res) => {
        const ridesResult = res.docs.map((r) => { return { ...r.data(), rideID: r.id } });
        setRides([...ridesResult])
        ridesResultArr = ridesResult
      }).catch((e) => {
        console.log(e);
      })
  }, []);

  return (
    <SafeAreaView>
      <PageHeader navigation={navigation} config={config.header}></PageHeader>
      <View style={styles.container}>
        {rides.length > 0 ?
          <FlatList
            data={rides}
            renderItem={({ item, index }) => (
              <SearchCard ride={item} key={index} />
            )}
          /> : <Text style={styles.noDataText}>No Result Found</Text>
        }
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
  noDataText: {
    marginTop: "30%",
    fontSize: 30
  }
});
export default SearchList;
