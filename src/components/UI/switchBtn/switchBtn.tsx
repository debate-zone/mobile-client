import React from "react";
import {StyleSheet, View} from "react-native";

const SwitchBtn: React.FC = () => {
    return(
        <View style={styles.switchScreen}>
        </View>
    )
}

const styles = StyleSheet.create({
    switchScreen: {
        marginTop: 66,
        width: 100,
        height: 45,
        backgroundColor: "black"
    }
})

export default SwitchBtn;