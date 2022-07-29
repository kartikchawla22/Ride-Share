import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import SearchCard from '../components/SearchCard';

const config = {
  user1: {
    source: require('./../Assets/userprofile.png'),
    UserName: 'Bharath',
    LeavingFrom: 'Barrie',
    GoingTo: 'Toronto',
    DateTime: '30 July 2022 5:00 PM',
  },
};

const SearchList = () => {
  return (
    <SafeAreaView>
      <SearchCard config={config.user1}></SearchCard>
      <SearchCard config={config.user1}></SearchCard>
    </SafeAreaView>
  );
};
export default SearchList;
