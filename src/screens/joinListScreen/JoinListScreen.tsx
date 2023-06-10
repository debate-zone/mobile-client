import { StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import JoinList from '../../../src/components/UI/joinList/joinList';
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
        const debateZones = await request<OutputDebateZoneList>(
            'GET',
            '/debate-zones/list',
        );
        return debateZones;
    };

    const onItemPress = (id: string) => {
        navigation.navigate('JoinDetailsScreen', {
            id: id,
        });
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
        height: '100%',
    },
});
