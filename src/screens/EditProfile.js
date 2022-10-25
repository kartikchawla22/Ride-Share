import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import PageHeader from '../components/pageHeader';
import Input from '../components/input';
import CustomButton from '../components/button';
import { validate } from '../utils/validation-wrapper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CONSTANTS } from '../utils/contants';

const config = {
  fields: {
    name: {
      placeholder: 'Name',
      type: 'text',
      autoComplete: 'name', //Android
      textContentType: 'name', //iOS
    },
    email: {
      placeholder: 'Email',
      type: 'text',
      textContentType: 'emailAddress', //iOS
      autoComplete: 'email', //Android
      editable: false
    },
  },
  header: {
    title: 'Edit Profile',
    closeButton: true,
  },
  SaveButton: {
    buttonText: 'Save',
    roundedButton: true,
  },
};

const EditProfile = ({ navigation, route }) => {
  const [email, onEmailChange] = React.useState(auth().currentUser.email);
  const [name, onNameChange] = React.useState(name);

  const [emailError, setEmailError] = React.useState(emailError);
  const [nameError, setNameError] = React.useState(nameError);


  const checkValidation = async () => {
    setEmailError(validate('email', email));

    setNameError(validate('name', name));

    formSubmitted = true;
    if (!email || !name) {
      return;
    }
    if (!emailError && !nameError) {
      await firestore().collection(CONSTANTS.USER_COLLECTION).doc(auth().currentUser.uid).update({
        userName: name
      })
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    firestore().collection(CONSTANTS.USER_COLLECTION).doc(auth().currentUser.uid).get().then(result => {
      onNameChange(result.data().userName)
    })
  }, [])
  React.useEffect(() => {
    formSubmitted = false;
  }, [route]);

  React.useEffect(() => {
    if (email === '' || !email) {
      onEmailChange(null);
    }
    else {
      setEmailError(validate('email', email));
    }
  }, [email]);

  React.useEffect(() => {
    if (name === '' || !name) {
      onNameChange(null);
    }
    else {
      setNameError(validate('name', name));
    }
  }, [name]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <PageHeader
            navigation={navigation}
            config={config.header}></PageHeader>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.profile}
            source={require('./../Assets/profile.png')}
          />
          <Text
            style={styles.editButton}
            onPress={() => {
              alert('select Photo');
            }}>
            Edit Profile Picture
          </Text>
        </View>
        <View style={styles.Body}>
          <Input
            value={name}
            config={config.fields.name}
            onChangeText={onNameChange}
            errorMessage={nameError}></Input>
          <Input
            value={email}
            config={config.fields.email}
            onChangeText={onEmailChange}
            errorMessage={emailError}></Input>
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={checkValidation}
            config={config.SaveButton}></CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  profile: {
    width: '40%',
    height: 150,
    marginBottom: 20,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
  },
  editButton: {
    color: '#3330BE',
    fontSize: 15,
  },
  Body: {
    marginTop: '20%',
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: '20%',
    width: '100%',
  },
  container1: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    marginBottom: '10%',
    width: '100%',
  },
});
export default EditProfile;
