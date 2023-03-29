import {Button, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Camera, CameraType} from "expo-camera";
import React, {useState} from "react";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    camera: {
        height: '100%',
        width: '100%',
    },
    buttonContainer: {
        height: '100%',
        width: '100%',
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
    }
});

const CameraComponent = () => {
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

export default CameraComponent;
