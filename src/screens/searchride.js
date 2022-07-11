import React from 'react';
import { View, StyleSheet, Text, Image, Keyboard, TextInput} from 'react-native';
import Input from '../components/input';
import CustomButton from '../components/button';
import { SafeAreaView } from 'react-native-safe-area-context';



const config = {
    header: {
        title: "Search Your Ride",
        closeButton: true
    },
    submitButton: {
        buttonText: 'Search',
        roundedButton: true
    }
}


const SearchRide =()=>{
    const [LeavingCity, onLeavingCityChange] = React.useState(LeavingCity);
    const [GoingCity, onGoingCityChange] = React.useState(GoingCity);
    const [Date, onDateChange] = React.useState(Date);
   
    return(
      
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.container}>
            <View style ={styles.header}>
                    <Text style ={styles.headingTextStyle}>Search Your Ride</Text>
                </View>
                <View style ={styles.inputContainer}>
                <TextInput style ={styles.textStyle}
                onChangeText={onLeavingCityChange}
                 placeholder="LeavingFrom"
                value={LeavingCity}
                />
                </View>
                <View style ={styles.inputContainer}>
                <TextInput style ={styles.textStyle}
                onChangeText={onGoingCityChange}
                 placeholder="Going To"
                value={GoingCity}
                />
                
                </View>
                <View style ={styles.inputContainer}>
                <TextInput style ={styles.textStyle}
                onChangeText={onDateChange}
                 placeholder="Enter the Date of Travel"
                value={Date}
                />
                
                </View>
                
               
                <View style={styles.buttonsContainer}><CustomButton onPress={()=>{alert("your search successfull")}} config={config.submitButton}></CustomButton></View>
                

                    
                 
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        alignItems: 'center',
    },
    header: {
        marginBottom: 90,
        marginTop : 30
        //width: "100%",

    },
    headingTextStyle : {
        fontSize : 30,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 200,
        width: "100%"
    },
    inputContainer: {
        display: 'flex',
        width: '90%',
        height : 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#E8E8E8",
        marginBottom : 20

    },
    textStyle:{
        color : "#000000"
    }
})

export default SearchRide;