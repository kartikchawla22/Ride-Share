import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Input from '../components/input';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';
import { validate } from '../utils/validation-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CONSTANTS } from '../utils/contants';
import { useIsFocused } from "@react-navigation/native"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const config = {
  fields: {
    email: {
      placeholder: 'Email',
      type: 'text',
      textContentType: 'emailAddress', //iOS
      autoComplete: 'email', //Android,
      name: 'email',
    },
    password: {
      placeholder: 'Password',
      type: 'password',
      textContentType: 'newPassword', //iOS
      name: 'email',
    },
  },
  submitButton: {
    buttonText: 'Log in',
    roundedButton: true,
  },
};
let formSubmitted = false;
const LoginPage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [email, onEmailChange] = React.useState(email);
  const [password, onPasswordChange] = React.useState(password);

  const [emailError, setEmailError] = React.useState(emailError);
  const [passwordError, setPasswordError] = React.useState(passwordError);

  const [wrongEmailOrPassword = false, setWrongEmailOrPassword] =
    React.useState(wrongEmailOrPassword);
  const [apiErrorMessage = '', setApiErrorMessage] =
    React.useState(apiErrorMessage);

  const [isLoading = false, setIsLoading] = React.useState(isLoading);

  const checkValidation = () => {
    setEmailError(validate('email', email))
    setPasswordError(validate('password', password))
    formSubmitted = true;
    if (!email || !password) {
      return;
    }
    if (!emailError && !passwordError && formSubmitted) {
      setIsLoading(true);
      auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          setIsLoading(false);
          const user = userCredential.user;
          firestore().collection(CONSTANTS.USER_COLLECTION).doc(user.uid).get().then(result => {
            Keyboard.dismiss();
            navigation.reset({
              routes: [
                { name: 'DrawerNavigationDelegate' }
              ],
            })
          })
        })
        .catch((error) => {
          setIsLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
        });
    }
    // firestore().collection('Users').doc('ABC').get();
  };

  const refreshPage = () => {
    formSubmitted = false;
    setWrongEmailOrPassword(false);
    onEmailChange(null);
    onPasswordChange(null);
    setPasswordError(null);
    setEmailError(null);
  };
  React.useEffect(() => {
    if (isFocused) {
      refreshPage();
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (email === '' || !email) {
      onEmailChange(null);
    }
    else {
      setEmailError(validate('email', email));
    }
    setWrongEmailOrPassword(false);
  }, [email]);

  React.useEffect(() => {
    if (password === '' || !password) {
      onPasswordChange(null);
    }
    else {
      setPasswordError(validate('password', password));
    }
    setWrongEmailOrPassword(false);
  }, [password]);

  return (
    <SafeAreaView pointerEvents={isLoading ? 'none' : 'auto'}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logostyle}
            source={require('./../Assets/Logo.png')}
          />
          {wrongEmailOrPassword ? (
            <Text style={styles.wrongEmailOrPasswordError}>
              {apiErrorMessage}
            </Text>
          ) : null}
          <Input
            value={email}
            config={config.fields.email}
            onChangeText={onEmailChange}
            errorMessage={emailError}></Input>
          <Input
            value={password}
            config={config.fields.password}
            onChangeText={onPasswordChange}
            errorMessage={passwordError}></Input>
        </View>
        {isLoading ? <View style={styles.loader} >
          <ActivityIndicator size="large" color={CSS_CONSTANTS.COLOR_PRIMARY} />
        </View> : null}
        <View style={styles.buttonsContainer}><CustomButton onPress={checkValidation} config={config.submitButton}></CustomButton></View>
        <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText} onPress={() => { navigation.navigate('ForgotPassword') }}>Forgot Your Password</Text></View>
        <View style={styles.forgotPasswordTextContainer}><Text onPress={() => {
          Keyboard.dismiss();
          navigation.navigate('SignUp')
        }} style={styles.forgotPasswordText}>Sign up</Text></View>
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
  buttonsContainer: {
    alignItems: 'center',
    marginTop: '20%',
    width: '100%',
  },
  forgotPasswordTextContainer: {
    marginTop: 25,
  },
  forgotPasswordText: {
    color: CSS_CONSTANTS.COLOR_PRIMARY,
    textDecorationLine: 'underline',
  },
  logostyle: {
    width: 150,
    height: 150,
    marginBottom: 100,
    alignSelf: 'center',
  },
  wrongEmailOrPasswordError: {
    color: CSS_CONSTANTS.ERROR_COLOR,
    alignSelf: 'center',
  },
  loader: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoginPage;
