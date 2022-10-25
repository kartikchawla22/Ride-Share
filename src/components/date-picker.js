import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CSS_CONSTANTS } from '../utils/css-contants';
import DateTimePicker from '@react-native-community/datetimepicker';



const DatePickerComponent = (props) => {
    const { config, errorMessage } = props;
    const [showPicker, setShowPicker] = useState(false)
    const [dateValue, setDateValue] = useState(new Date())
    const onChange = (event, selectedDate) => {
        setShowPicker(false)
        if (event?.type === 'dismissed') {
            setDateValue(dateValue);
            return;
        }
        props.onDateChange(selectedDate)
        setDateValue(selectedDate);
    };
    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, !!errorMessage ? styles.hasError : null]}>
                {showPicker &&
                    <DateTimePicker
                        minimumDate={new Date()}
                        positiveButtonLabel="Confirm"
                        negativeButtonLabel="Cancel"
                        mode='date'
                        onChange={onChange}
                        value={dateValue}
                    />
                }
                <Text onPress={() => setShowPicker(true)} style={styles.inputField}>{dateValue.toDateString()}</Text>
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
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#E8E8E8"
    },
    inputField: {
        padding: 15,
        fontSize: 15,
        width: '100%',
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