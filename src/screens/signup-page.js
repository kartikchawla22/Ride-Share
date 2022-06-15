import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Input from '../components/input';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';

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
        title: "Signup Page"
    }
}

const SignupPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <PageHeader config={config.header}></PageHeader>
            </View>
            <View >
                <Input config={config.fields.name}></Input>
                <Input config={config.fields.email}></Input>
                <Input config={config.fields.password}></Input>
                <Input config={config.fields.confirmPassword}></Input>
            </View>
            <View style={styles.buttonsContainer}><CustomButton ></CustomButton></View>
            <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText}>Forgot Your Password</Text></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: "flex",
        alignItems: 'center',
    },
    header: {
        marginBottom: 120,
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
        color: CSS_CONSTANTS.COLOR_PRIMARY
    }
})
export default SignupPage;