import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';

const CustomButton = (props) => {
    const { config } = props;
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.button, config.roundedButton ? styles.roundedButton : null]}
        ><Text style={styles.buttonText}>{config.buttonText}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: CSS_CONSTANTS.COLOR_PRIMARY,
        borderWidth: 1,
        borderColor: '#fff',
        width: "80%",
        height: 40,
        alignItems: 'center',
        padding: 10
    },
    roundedButton: {
        borderRadius: 100,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: "bold"
    }
});
export default CustomButton;