import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Input from '../components/input';
import PageHeader from '../components/pageHeader';
import CustomButton from '../components/button'
import { CSS_CONSTANTS } from '../utils/css-contants';
import Logo from '../components/logo';
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
    header: {
        title: "LoginPage"
    }
}

const LoginPage = () =>{
    return (
        <View style={styles.container}>
            
            
            
            <View >
            <Image style = {styles.logostyle} source = { 
                require('./../Assets/Logo.jpeg')
            }/>
                
                <Input config={config.fields.email}></Input>
                <Input config={config.fields.password}></Input>
               
            </View>
            <View style={styles.buttonsContainer}><CustomButton ></CustomButton></View>
            <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText}>Forgot Your Password</Text></View>
            <View style={styles.forgotPasswordTextContainer}><Text style={styles.forgotPasswordText}>Signin</Text></View>
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
        marginBottom: 50,
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
    },
    logostyle : {
        position : 'relative',
        left : 100,
        width : 150,
        height : 150,
        marginTop : 50,
        marginBottom : 50

    }

})
export default LoginPage;
    
