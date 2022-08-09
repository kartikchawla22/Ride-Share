import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Input from '../components/input';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';
import validate from '../utils/validation-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';


const config = {
    fields: {
        name: {
            placeholder: "Name",
            type: "text",
            autoComplete: "name", //Android
            textContentType: "name" //iOS
        },
        email: {
            placeholder: "Email",
            type: "text",
            textContentType: "emailAddress", //iOS
            autoComplete: "email" //Android
        },
        password: {
            placeholder: "Password",
            type: "password",
            textContentType: "newPassword", //iOS
        },
        confirmPassword: {
            placeholder: "Confirm Password",
            type: "password",
            textContentType: "newPassword", //iOS
        }
    },
    header: {
        title: "Signup Page",
        closeButton: true
    },
    submitButton: {
        buttonText: 'Submit',
        roundedButton: true
    }
}
let formSubmitted = false;

const SignupPage = ({ navigation, route }) => {
    const signupApi = async () => {
        try {
            const response = await fetch(
                `https://script.google.com/macros/s/${route.params.APPCONFIG.apiUrl}/exec?signup=signup&email=${email}&password=${password}&name=${name}`
            );
            const result = await response.json();
            return result
        } catch (error) {
            return error
        }
    }
    const [email, onEmailChange] = React.useState(email);
    const [password, onPasswordChange] = React.useState(password);
    const [name, onNameChange] = React.useState(name);
    const [confirmPassword, onConfirmPasswordChange] = React.useState(confirmPassword);

    const [emailError, setEmailError] = React.useState(emailError);
    const [passwordError, setPasswordError] = React.useState(passwordError);
    const [nameError, setNameError] = React.useState(nameError);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(confirmPasswordError);
    const [apiErrorMessage = "", setApiErrorMessage] = React.useState(apiErrorMessage);
    const [isLoading = false, setIsLoading] = React.useState(isLoading);

    const checkValidation = () => {
        setEmailError(validate('email', email))
        setPasswordError(validate('password', password))
        setNameError(validate('name', name))
        setConfirmPasswordError(validate(['confirmPassword', 'password'], [confirmPassword, password]))
        formSubmitted = true;
        if (!email || !password || !confirmPassword || !name) {
            return;
        }
        setTimeout(() => {
            if (!emailError && !passwordError && !nameError && !confirmPasswordError) {
                setIsLoading(true);
                signupApi().then((res) => {
                    setIsLoading(false);
                    if (res.status === "Error") {
                        setApiErrorMessage(res.data.message);
                    } else {
                        navigation.reset({
                            routes: [
                                { name: 'Login', params: res.data[0] }
                            ],
                        })
                    }
                }).catch(alert);
            }
        }, 0);
    }
    React.useEffect(() => {


    }, [emailError, passwordError, nameError, confirmPasswordError, apiErrorMessage])

    React.useEffect(() => {
        formSubmitted = false;
    }, [route]);

    React.useEffect(() => {
        if (email === "") {
            onEmailChange(null)
        }
        if (formSubmitted) {
            setEmailError(validate('email', email))
        }
    }, [email]);
    React.useEffect(() => {
        if (name === "") {
            onNameChange(null)
        }
        if (formSubmitted) {
            setNameError(validate('name', name))
        }
    }, [name]);
    React.useEffect(() => {
        if (password === "") {
            onPasswordChange(null)
        }
        if (formSubmitted) {
            setPasswordError(validate('password', password))
        }
    }, [password]);
    React.useEffect(() => {
        if (confirmPassword === "") {
            onConfirmPasswordChange(null)
        }
        if (formSubmitted) {
            setConfirmPasswordError(validate(['confirmPassword', 'password'], [confirmPassword, password]))
        }
    }, [confirmPassword]);


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }} pointerEvents={isLoading ? "none" : "auto"}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <PageHeader navigation={navigation} config={config.header}></PageHeader>
                </View>
                <View >
                    {apiErrorMessage === "" ? null : <Text style={styles.apiErrorMessage}>{apiErrorMessage}</Text>}
                    <Input config={config.fields.name} onChangeText={onNameChange} errorMessage={nameError}></Input>
                    <Input config={config.fields.email} onChangeText={onEmailChange} errorMessage={emailError}></Input>
                    <Input config={config.fields.password} onChangeText={onPasswordChange} errorMessage={passwordError}></Input>
                    <Input config={config.fields.confirmPassword} onChangeText={onConfirmPasswordChange} errorMessage={confirmPasswordError}></Input>
                </View>
                {isLoading ? <View style={styles.loader} >
                    <ActivityIndicator size="large" color={CSS_CONSTANTS.COLOR_PRIMARY} />
                </View> : null}
                <View style={styles.buttonsContainer}><CustomButton onPress={checkValidation} config={config.submitButton}></CustomButton></View>
                <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText}>Forgot Your Password</Text></View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        alignItems: 'center',
    },
    header: {
        marginBottom: "10%",
        width: "100%"
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 70,
        width: "100%"
    },
    forgotPasswordTextContainer: {
        marginTop: 25
    },
    forgotPasswordText: {
        color: CSS_CONSTANTS.COLOR_PRIMARY,
        textDecorationLine: "underline"
    },
    apiErrorMessage: {
        color: CSS_CONSTANTS.ERROR_COLOR,
        alignSelf: "center"
    },
    loader: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default SignupPage;