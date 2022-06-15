import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Pressable, Text, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const PageHeader = (props) => {
    const { config } = props;
    return (
        <View style={styles.container}>
            <IconAntDesign style={styles.closeIcon}
                name='close' />
            <Text style={styles.header}>

                {config.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        marginTop: 25,
        maxWidth: "100%",
        justifyContent: "space-between",
        alignItems: "center",


        // flex: 1,
        // justifyContent: 'flex-start'
    },
    header: {
        flex: 0.9,
        textAlign: "center",
        fontSize: 30,
    },
    closeIcon: {
        flex: 0.1,
        left: 10,
        // marginLeft: 30,
        height: 30,
        width: 30,
    }
});
export default PageHeader;