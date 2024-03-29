import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageUploader from '../utils/image-upload';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
const config = {
  header: {
    title: 'Kartik Chawla',
    closeButton: true,
  },
};

const ProfilePage = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [profileImage, setProfileImage] = React.useState('')

  useEffect(() => {
    const image = storage().ref(`profileImages/${auth().currentUser.uid}`);
    image.getDownloadURL().then(setProfileImage);
  }, [isFocused])

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.photoStyle}
            source={{
              uri: profileImage,
              cache: 'reload'
            }}
          />
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
            onPress={async () => {
              const url = await ImageUploader('docs')
              if (url) {
                Alert.alert('Success', 'Your document is being verified');
              }
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
    marginTop: 20
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
