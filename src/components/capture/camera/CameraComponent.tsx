import {Button, StyleSheet, TouchableOpacity, View, Text, Image, Animated} from "react-native";
import {Camera, CameraType, FaceDetectionResult} from "expo-camera";
import React, {useState} from "react";
import * as FaceDetector from 'expo-face-detector';
import {useAssets} from "expo-asset";

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

type Face = {
    bottomMouthPosition: { x: number, y: number },
    bounds: {
        origin: { x: number, y: number },
        size: { height: number, width: number },
    },
    faceID: number,
    leftCheekPosition: { x: number, y: number },
    leftEarPosition: { x: number, y: number },
    leftEyeOpenProbability: number,
    leftEyePosition: { x: number, y: number },
    leftMouthPosition: { x: number, y: number },
    noseBasePosition: { x: number, y: number },
    rightCheekPosition: { x: number, y: number },
    rightEarPosition: { x: number, y: number },
    rightEyeOpenProbability: number,
    rightEyePosition: { x: number, y: number },
    rightMouthPosition: { x: number, y: number },
    rollAngle: number,
    smilingProbability: number,
    yawAngle: number,
}

const CameraComponent = () => {
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    // todo will be uploaded from server array of faces

    const [assets, error] = useAssets([require('../../../../assets/face-0001.jpg')]);
    const [faceAnimation] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const [sizeAnimation] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const [rotationAnimation] = useState(new Animated.Value(0));


    if (error) {
        return (
            <View>
                <Text>Asset loading error</Text>
            </View>
        );
    }

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

    const onFacesDetected = (faceDetectionResult: FaceDetectionResult) => {
        const faces: Face[] = faceDetectionResult.faces as Face[];
        if (faces.length === 1 && faces[0].bounds) {
            return drawFace(faces[0].bounds, faces[0].rollAngle);
        } else {
            return
        }
    }

    const drawFace = (bounds: Face["bounds"], rollAngle: Face["rollAngle"]) => {
        if (!bounds) {
            return null;
        }

        const { origin, size } = bounds;

        const initialSize = { width: assets[0].width , height: assets[0].height };

        const scaleX = size.width / initialSize.width;
        const scaleY = size.height / initialSize.height;

        const duration = 150;

        Animated.parallel([
            Animated.timing(faceAnimation, {
                toValue: { x: origin.x, y: origin.y },
                duration,
                useNativeDriver: true,
            }),
            Animated.timing(sizeAnimation, {
                toValue: { x: scaleX, y: scaleY },
                duration,
                useNativeDriver: true,
            }),
            Animated.timing(rotationAnimation, {
                toValue: rollAngle,
                duration,
                useNativeDriver: true,
            }),
        ]).start();
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera}
                    type={type}
                    onFacesDetected={onFacesDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.FaceDetectorMode.accurate,
                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                        runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        minDetectionInterval: 100,
                        tracking: true,
                    }}
            >
                {/*todo separate to dif component*/}
                <Animated.Image
                    source={assets[0]}
                    style={{
                        transform: [
                            { translateX: faceAnimation.x },
                            { translateY: faceAnimation.y },
                            { scaleX: sizeAnimation.x },
                            { scaleY: sizeAnimation.y },
                            { rotateZ: rotationAnimation.interpolate({
                                    inputRange: [-360, 360],
                                    outputRange: ['-360deg', '360deg'],
                                })
                            },
                        ],
                    }}
                />
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
