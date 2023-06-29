import { Dimensions, StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import JoinList from '../../components/debateZone/joinList/joinList';
import { request } from '../../apiClient/apiClient';
import { OutputDebateZoneList } from '../../types/debateZone';
import { useEffect, useState } from 'react';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'JoinListScreen'>;
}
export const JoinListScreen = ({ navigation }: RootScreenProps) => {
    const [outputDebateZoneList, setOutputDebateZoneList] =
        useState<OutputDebateZoneList>(undefined);

    const getDebateZones = async () => {
        return await request<OutputDebateZoneList>(
            'GET',
            '/debate-zone/v1/debate-zones/list',
        );
    };

    const onItemPress = (id: string) => {
        const isLive = outputDebateZoneList.debateZones.find(
            x => x._id === id,
        )?.isLive;

        if (isLive) {
            navigation.navigate('ActiveScreen', {
                debateZoneId: id,
            });
        } else {
            navigation.navigate('JoinDetailsScreen', {
                id: id,
            });
        }
    };

    useEffect(() => {
        getDebateZones().then(debateZoneList => {
            setOutputDebateZoneList(debateZoneList);
        });
    }, []);

    return (
        <View style={styles.container}>
            <JoinList
                outputDebateZoneList={outputDebateZoneList}
                onPress={onItemPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A9BBE2',
        width: '100%',
        paddingTop: 20,
        height: "100%",
    },
});
