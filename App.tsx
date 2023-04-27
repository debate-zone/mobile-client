import { StatusBar } from 'expo-status-bar';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import CameraComponent from "./src/components/capture/camera/CameraComponent"
import PoliticalCompass from "./src/components/preferance_page/PoliticalPreference"
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function App() {
    function handleButtonPress(event: GestureResponderEvent): void {
        throw new Error('Function not implemented.');
    }

    return (
        <View style={styles.container}>
            <Text style={{marginBottom: 100}}>Select your political preference</Text>
            <StatusBar style="auto" />
            {/* <CameraComponent /> */}
            <PoliticalCompass
                size={19.47}
                cellStyle={{ backgroundColor: 'silver' }}
                renderButton={() => (
                    <TouchableOpacity onPress={handleButtonPress}>
                        <Text>BUTTON</Text>
                    </TouchableOpacity>
                )}
            />
            {/* <PoliticalCompass size={19.47} cellStyle={{ backgroundColor: 'silver' }} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 100,
    },
});
