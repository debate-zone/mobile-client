import React from "react";
import {StyleSheet, View, TouchableOpacity, Image, Text} from "react-native";
import HomeSvg from "../../../src/components/svgIcons/home"
import ProfileSvg from "../../../src/components/svgIcons/profile";
import CreateSvg from "../../../src/components/svgIcons/create";
import {Icon} from "@expo/webpack-config/webpack/plugins/PwaManifestWebpackPlugin";
import {useNavigation} from "@react-navigation/native";
import {HomeScreen} from "../../../src/screens/homeScreen/HomeScreen";

const BottomBar: React.FC = () => {
    const navigation = useNavigation<any>();
    const navigateHome = () => {
        navigation.navigate("HomeScreen")
    }

    const navigateProfile = () => {
        navigation.navigate("ProfileScreen")
    }

    const navigateNewDebateZone = () => {
        navigation.navigate("NewDebateZoneScreen")
    }

    const navigateJoinList = () => {
        navigation.navigate("JoinListScreen")
    }
    return(
        <View style={styles.container}>
            <View style={styles.NavBar}>
                <TouchableOpacity
                    onPress={navigateHome}
                >
                <HomeSvg/>
                    <Text style={styles.Text}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={navigateJoinList}
                >
                    <Image source={require('./logo.png')} resizeMode={'contain'} style={{height:39, width:36}}/>
                    <Text style={styles.Text}>Join</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={navigateNewDebateZone}
                >
                    <CreateSvg/>
                    <Text style={styles.Text}>Create</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={navigateProfile}
                >
                    <ProfileSvg/>
                    <Text style={styles.Text}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: 'center',
        bottom: 0,
        backgroundColor: 'black'
    },
    NavBar: {
        marginTop: 9,
        flexDirection: "row",
        backgroundColor: "black",
        width: '100%',
        height: 66,
        justifyContent: "space-evenly"
    },
    IconBehave: {
        padding: 14
    },
    Text: {
        display: 'flex',
        alignItems: "center",
        fontStyle: 'normal',
        fontSize: 8,
        textAlign: 'center',
        color: '#999'
    }
})
export default BottomBar;