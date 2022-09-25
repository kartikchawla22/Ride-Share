import React from 'react';
import { View, StyleSheet, Text, Image, Keyboard, ActivityIndicator } from 'react-native';
import Input from '../components/input';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';
import validate from '../utils/validation-wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CONSTANTS } from '../utils/contants';
import { useIsFocused } from "@react-navigation/native"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PageHeader from '../components/pageHeader';

const config = {
    fields: {
        email: {
            placeholder: "Email",
            type: "text",
            textContentType: "emailAddress", //iOS
            autoComplete: "email", //Android,
            name: "email"
        },
    },
    submitButton: {
        buttonText: 'Submit',
        roundedButton: true
    },
    header: {
        title: "Forgot Password",
        closeButton: true
    },
}
let formSubmitted = false;
const ForgotPasswordPage = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [email, onEmailChange] = React.useState(email);

    const [emailError, setEmailError] = React.useState(emailError);

    const [isLoading = false, setIsLoading] = React.useState(isLoading);

    const checkValidation = () => {

        setEmailError(validate('email', email))
        formSubmitted = true;
        if (!email) {
            return;
        }
        setTimeout(async () => {
            if (!emailError && formSubmitted) {
                setIsLoading(true);
                try {
                    const response = await auth().sendPasswordResetEmail(email);
                    console.log("Response:  ", response);
                } catch (e) {
                    console.log("Error: ", e);
                }

                setIsLoading(false);
                // auth().signInWithEmailAndPassword(email, password)
                //     .then((userCredential) => {
                //         // Signed in 
                //         setIsLoading(false);
                //         const user = userCredential.user;
                //         console.log(user);
                //         firestore().collection(CONSTANTS.USER_COLLECTION).doc(user.uid).get().then(result => {
                //             Keyboard.dismiss();
                //             navigation.reset({
                //                 routes: [
                //                     { name: 'DrawerNavigationDelegate' }
                //                 ],
                //             })
                //         })
                //     })
                //     .catch((error) => {
                //         setIsLoading(false);
                //         const errorCode = error.code;
                //         const errorMessage = error.message;
                //         alert(errorMessage)
                //     });
            }
            // firestore().collection('Users').doc('ABC').get();
        }, 0);
    }

    const refreshPage = () => {
        formSubmitted = false;
        onEmailChange(null);
        setEmailError(null);
    }
    React.useEffect(() => {
        if (isFocused) {
            refreshPage();
        }
    }, [isFocused]);

    React.useEffect(() => {
        if (email === "") {
            onEmailChange(null)
        }
        if (formSubmitted) {
            setEmailError(validate('email', email))
        }
    }, [email]);

    return (
        <SafeAreaView pointerEvents={isLoading ? "none" : "auto"}>
            <View style={styles.header}>
                <PageHeader navigation={navigation} config={config.header}></PageHeader>
            </View>
            <View style={styles.container}>
                <View>
                    <View style={styles.forgotPasswordTextContainer}>
                        <Text style={styles.forgotPasswordHeading}>Forgot your password?</Text>
                        <Text style={styles.forgotPasswordParagraph}>
                            Don’t worry, just enter your email and we’ll send you a rest link.</Text>
                    </View>
                    <Input value={email} config={config.fields.email} onChangeText={onEmailChange} errorMessage={emailError}></Input>
                </View>
                {isLoading ? <View style={styles.loader} >
                    <ActivityIndicator size="large" color={CSS_CONSTANTS.COLOR_PRIMARY} />
                </View> : null}
                <View style={styles.buttonsContainer}><CustomButton onPress={checkValidation} config={config.submitButton}></CustomButton></View>
            </View>
        </SafeAreaView>
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
        marginTop: "20%",
        width: "100%"
    },
    logostyle: {
        width: 150,
        height: 150,
        marginBottom: 100,
        alignSelf: "center"
    },
    loader: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotPasswordTextContainer: {
        marginTop: "10%",
        marginBottom: "10%"
    },
    forgotPasswordHeading: {
        fontSize: 40,
        fontWeight: '500'
    },
    forgotPasswordParagraph: {
        fontSize: 30,
        fontWeight: '500'
    }

})
export default ForgotPasswordPage;

