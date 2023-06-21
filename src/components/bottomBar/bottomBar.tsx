import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import HomeSvg from '../../../src/components/svgIcons/home';
import ProfileSvg from '../../../src/components/svgIcons/profile';
import CreateSvg from '../../../src/components/svgIcons/create';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from '../../../src/screens/homeScreen/HomeScreen';

const BottomBar: React.FC = () => {
    const navigation = useNavigation<any>();
    const navigateHome = () => {
        navigation.navigate('HomeScreen');
    };

    const navigateProfile = () => {
        navigation.navigate('ProfileScreen');
    };

    const navigateNewDebateZone = () => {
        navigation.navigate('NewDebateZoneScreen');
    };

    const navigateJoinList = () => {
        navigation.navigate('JoinListScreen');
    };
    return (
        <View style={styles.container}>
            <View style={styles.NavBar}>
                <TouchableOpacity onPress={navigateHome}>
                    <HomeSvg />
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateJoinList}>
                    <Image
                        source={require('./logo.png')}
                        resizeMode={'contain'}
                        style={{ height: 39, width: 36 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateNewDebateZone}>
                    <CreateSvg />
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateProfile}>
                    <ProfileSvg />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        height: 80,
        bottom: 0,
        backgroundColor: 'rgba(40,38,38,0.8)',
    },
    NavBar: {
        marginTop: 9,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
    },
    IconBehave: {
        padding: 14,
    },
    Text: {
        display: 'flex',
        alignItems: 'center',
        fontStyle: 'normal',
        fontSize: 8,
        textAlign: 'center',
        color: '#999',
    },
});
export default BottomBar;
/*
df*/
