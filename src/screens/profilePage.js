import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const config = {
  header: {
    title: 'Kartik Chawla',
    closeButton: true,
  },
};

const ProfilePage = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.photoStyle}
            source={require('./../Assets/profile.png')}></Image>
        </View>
        <View Style={styles.touchableOpacityStyle}>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <Text style={styles.textStyle}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              alert('Add doccuments');
            }}>
            <Text style={styles.textStyle}>Add Documents</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    marginBottom: 120,
    width: '100%',
    marginTop: -50,
  },
  textStyle: {
    fontSize: 30,
  },
  touchableOpacityStyle: {
    width: '40%',
    height: '20%',
    alignSelf: 'flex-start',
  },
  photoStyle: {
    width: 150,
    height: 150,
    marginBottom: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
  },
});
export default ProfilePage;
