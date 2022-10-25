import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Input from '../components/input';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';
import { validate, validateConfirmPassword } from '../utils/validation-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        },
        password: {
            placeholder: 'Password',
            type: 'password',
            textContentType: 'newPassword', //iOS
        },
        confirmPassword: {
            placeholder: 'Confirm Password',
            type: 'password',
            textContentType: 'newPassword', //iOS
        },
    },
    header: {
        title: 'Signup Page',
        closeButton: true,
    },
    submitButton: {
        buttonText: 'Submit',
        roundedButton: true,
    },
};
let formSubmitted = false;

const SignupPage = ({ navigation, route }) => {
    const [email, onEmailChange] = React.useState(email);
    const [password, onPasswordChange] = React.useState(password);
    const [name, onNameChange] = React.useState(name);
    const [confirmPassword, onConfirmPasswordChange] = React.useState(confirmPassword);

    const [emailError, setEmailError] = React.useState(emailError);
    const [passwordError, setPasswordError] = React.useState(passwordError);
    const [nameError, setNameError] = React.useState(nameError);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(confirmPasswordError);
    const [apiErrorMessage = '', setApiErrorMessage] = React.useState(apiErrorMessage);
    const [isLoading = false, setIsLoading] = React.useState(isLoading);

    const checkValidation = async () => {

        setEmailError(validate('email', email))
        setPasswordError(validate('password', password))
        setNameError(validate('name', name))
        setConfirmPasswordError(validateConfirmPassword(['confirmPassword', 'password'], [confirmPassword, password]));
        formSubmitted = true;
        if (!email || !password || !confirmPassword || !name) {
            return;
        }

        if (!emailError && !passwordError && !nameError && !confirmPasswordError) {
            setIsLoading(true);

            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    user.user.updateProfile({
                        displayName: name
                    })
                    firestore().collection(CONSTANTS.USER_COLLECTION).doc(user.user.uid).set({
                        userName: name,
                        profilePicURL: ""
                    }).then((res) => {
                        setIsLoading(false);
                        navigation.reset({
                            routes: [
                                { name: 'Login' }
                            ],
                        })
                    })
                })
                .catch(error => {
                    setIsLoading(false);
                    if (error.code === 'auth/email-already-in-use') {
                        setApiErrorMessage('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        setApiErrorMessage('That email address is invalid!');
                    }
                })
        }
    }

    React.useEffect(() => {
        formSubmitted = false;
        setEmailError(null)
        setPasswordError(null)
        setNameError(null)
        setConfirmPasswordError(null)
    }, [route]);

    React.useEffect(() => {
        if (email === '' || !email) {
            onEmailChange(null);
        } else {
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
    React.useEffect(() => {
        if (password === '' || !password) {
            onPasswordChange(null);
        }
        else {
            setPasswordError(validate('password', password));
        }
    }, [password]);
    React.useEffect(() => {
        if (confirmPassword === '' || !confirmPassword) {
            onConfirmPasswordChange(null);
        }
        else {
            setConfirmPasswordError(validateConfirmPassword(['confirmPassword', 'password'], [confirmPassword, password]));
        }
    }, [confirmPassword]);

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
            pointerEvents={isLoading ? 'none' : 'auto'}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <PageHeader
                        navigation={navigation}
                        config={config.header}></PageHeader>
                </View>
                <View>
                    {apiErrorMessage === '' ? null : (
                        <Text style={styles.apiErrorMessage}>{apiErrorMessage}</Text>
                    )}
                    <Input
                        config={config.fields.name}
                        onChangeText={onNameChange}
                        errorMessage={nameError}></Input>
                    <Input
                        config={config.fields.email}
                        onChangeText={onEmailChange}
                        errorMessage={emailError}></Input>
                    <Input
                        config={config.fields.password}
                        onChangeText={onPasswordChange}
                        errorMessage={passwordError}></Input>
                    <Input
                        config={config.fields.confirmPassword}
                        onChangeText={onConfirmPasswordChange}
                        errorMessage={confirmPasswordError}></Input>
                </View>
                {isLoading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator
                            size="large"
                            color={CSS_CONSTANTS.COLOR_PRIMARY}
                        />
                    </View>
                ) : null}
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        onPress={checkValidation}
                        config={config.submitButton}></CustomButton>
                </View>
                <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText} onPress={() => { navigation.navigate('ForgotPassword') }}>Forgot Your Password</Text></View>
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
        marginBottom: '10%',
        width: '100%',
    },
    buttonsContainer: {
        alignItems: 'center',
        marginTop: 70,
        width: '100%',
    },
    forgotPasswordTextContainer: {
        marginTop: 25,
    },
    forgotPasswordText: {
        color: CSS_CONSTANTS.COLOR_PRIMARY,
        textDecorationLine: 'underline',
    },
    apiErrorMessage: {
        color: CSS_CONSTANTS.ERROR_COLOR,
        alignSelf: 'center',
    },
    loader: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default SignupPage;
