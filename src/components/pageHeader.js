import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Pressable, Text, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { CSS_CONSTANTS } from '../utils/css-contants';

const PageHeader = (props) => {
    const { config } = props;
    return (
        <View style={styles.container}>
            <IconAntDesign style={styles.closeIcon}
                name='close' />
            <Text style={styles.header}>
                {config.title}</Text>
            {!!config.rightHandButtonText ? <Text style={styles.righHandButton}>{config.rightHandButtonText}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        marginTop: 25,
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
    },
    header: {
        fontSize: 30,
    },
    closeIcon: {
        left: 10,
        position: "absolute",
        fontSize: 20
    },
    righHandButton: {
        right: 10,
        position: "absolute",
        fontSize: 15,
        color: CSS_CONSTANTS.COLOR_PRIMARY
    }
});
export default PageHeader;