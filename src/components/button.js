import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';

const CustomButton = (props) => {
    const { config } = props;
    return (
        <TouchableOpacity
            style={styles.submitButton}
        ><Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: CSS_CONSTANTS.COLOR_PRIMARY,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff',
        width: "80%",
        height: 40,
        alignItems: 'center',
        padding: 10
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: "bold"
    }
});
export default CustomButton;