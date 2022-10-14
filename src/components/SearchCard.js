import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
} from 'react-native';

const SearchCard = props => {
  const { config } = props;
  return (
    <SafeAreaView style={styles.SearchCard}>
      <Image style={styles.userprofile} source={config.source}></Image>

      <View style={styles.textItems}>
        <Text style={styles.UserText}> {config.UserName} </Text>
        <Text style={styles.textstyle}> From : {config.LeavingFrom} </Text>
        <Text style={styles.textstyle}> To : {config.GoingTo} </Text>
        <Text style={styles.textstyle}> {config.DateTime} </Text>
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
