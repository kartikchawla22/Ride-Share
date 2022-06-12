import React from 'react';
import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';

const Input = (props) => {
    const { config } = props;
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputField}
                    name={config.name}
                    placeholder={config.placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType={config.textContentType}
                    autoComplete={config.autoComplete}
                    secureTextEntry={config.type === "password"}
                    enablesReturnKeyAutomatically
                    contextMenuHidden={config.type === "password"}
                />
                {config.type === "password" ?
                    <Pressable style={styles.inputFieldButton}><Text style={styles.showButtonText}>Show</Text></Pressable>
                    : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: 'center',
        marginTop: 25,
        width: "100%",
    },
    inputContainer: {
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#E8E8E8",

    },
    inputField: {
        padding: 15,
        fontSize: 15,
        width: '100%',
    },
    inputFieldButton: {
        position: 'absolute',
        right: 25,
    },
    showButtonText: {
        color: CSS_CONSTANTS.COLOR_PRIMARY
    }
});
export default Input;