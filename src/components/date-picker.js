import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';
import DatePicker from 'react-native-datepicker'


const DatePickerComponent = (props) => {
    const { config, errorMessage } = props;
    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, !!errorMessage ? styles.hasError : null]}>
                <DatePicker
                    style={{ width: "100%" }}
                    mode="datetime"
                    placeholder={config.placeholder}
                    format="YYYY-MM-DD \at h:m A"
                    minDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    allowFontScaling={true}
                    customStyles={styles.inputField}
                />

            </View>
            {!!errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: 'center',
        marginTop: 25,
        width: "100%"
    },
    inputContainer: {
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CSS_CONSTANTS.GREY_BACKGROUND,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#E8E8E8",
        paddingLeft: 15,
    },
    inputField: {
        dateInput: {
            borderWidth: 0,
            alignItems: "flex-start",
        },
        dateText: {
            fontSize: 15
        },
        placeholderText: {
            fontSize: 15
        },
    },
    hasError: {
        borderColor: CSS_CONSTANTS.ERROR_COLOR
    },
    errorMessage: {
        color: CSS_CONSTANTS.ERROR_COLOR,
        alignSelf: "flex-start",
        marginLeft: 5
    }
});
export default DatePickerComponent;