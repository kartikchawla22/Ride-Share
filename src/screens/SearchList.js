import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import SearchCard from '../components/SearchCard';
import PageHeader from '../components/pageHeader';

const config = {
  user1: {
    source: require('./../Assets/userprofile.png'),
    UserName: 'Bharath',
    LeavingFrom: 'Barrie',
    GoingTo: 'Toronto',
    DateTime: '30 July 2022 5:00 PM',
  },
  header: {
    title: 'Search Results',
    closeButton: true,
  },
};

const SearchList = ({ navigation }) => {
  return (
    <SafeAreaView>
      <PageHeader navigation={navigation} config={config.header}></PageHeader>

      <SearchCard config={config.user1}></SearchCard>
      <SearchCard config={config.user1}></SearchCard>
    </SafeAreaView>
  );
};
export default SearchList;
