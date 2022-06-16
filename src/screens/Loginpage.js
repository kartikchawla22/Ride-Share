import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Input from '../components/input';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';
import validate from '../utils/validation-wrapper';
const config = {
    fields: {
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
    submitButton: {
        buttonText: 'Log in',
        roundedButton: true
    }
}
let formSubmitted = false;
const LoginPage = () => {
    const [email, onEmailChange] = React.useState(email);
    const [password, onPasswordChange] = React.useState(password);

    const [emailError, setEmailError] = React.useState(emailError);
    const [passwordError, setPasswordError] = React.useState(passwordError);

    const checkValidation = () => {
        setEmailError(validate('email', email))
        setPasswordError(validate('password', password))
        formSubmitted = true;
        if (!emailError && !passwordError) {
            // console.log('ok report')
        }
    }
    React.useEffect(() => {
        if (email === "") {
            onEmailChange(null)
        }
        if (formSubmitted) {
            setEmailError(validate('email', email))
        }
    }, [email]);

    React.useEffect(() => {
        if (password === "") {
            onPasswordChange(null)
        }
        if (formSubmitted) {
            setPasswordError(validate('password', password))
        }
    }, [password]);
    return (
        <View style={styles.container}>
            <View >
                <Image style={styles.logostyle} source={require('./../Assets/Logo.jpeg')} />
                <Input config={config.fields.email} onChangeText={onEmailChange} errorMessage={emailError}></Input>
                <Input config={config.fields.password} onChangeText={onPasswordChange} errorMessage={passwordError}></Input>

            </View>
            <View style={styles.buttonsContainer}><CustomButton onPress={checkValidation} config={config.submitButton}></CustomButton></View>
            <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText}>Forgot Your Password</Text></View>
            <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText}>Signin</Text></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        alignItems: 'center',
        justifyContent: "center"
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 160,
        width: "100%"
    },
    forgotPasswordTextContainer: {
        marginTop: 25
    },
    forgotPasswordText: {
        color: CSS_CONSTANTS.COLOR_PRIMARY
    },
    logostyle: {
        width: 150,
        height: 150,
        marginBottom: 100,
        alignSelf: "center"
    }

})
export default LoginPage;

