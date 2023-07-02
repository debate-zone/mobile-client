import { View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { HomeTabComponent } from '../../components/home/homeTab/homeTabComponent';
import { useEffect, useState } from 'react';
import { OutputDebateZoneList } from '../../types/debateZone';
import { LiveListComponent } from '../../components/home/live/liveListComponent';
import { request } from '../../apiClient/apiClient';
import { FeedListComponent } from '../../components/home/feed/list/feedListComponent';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
}

export const HomeScreen = ({ navigation }: RootScreenProps) => {
    const [liveDebateZoneList, setLiveDebateZoneList] =
        useState<OutputDebateZoneList>(undefined);
    const [feedDebateZoneList, setFeedDebateZoneList] =
        useState<OutputDebateZoneList>(undefined);
    const getLiveDebateZoneList = async () => {
        return request<OutputDebateZoneList>(
            'GET',
            '/debate-zone/v1/debate-zones/active/list',
        );
    };

    const getFeedDebateZoneList = async () => {
        return request<OutputDebateZoneList>(
            'GET',
            '/debate-zone/v1/debate-zones/feed/list',
        );
    };

    const onFeedItemPress = (debateZoneId: string) => {
        navigation.navigate('FeedDetailsScreen', {
            debateZoneId: debateZoneId,
        });
    };

    useEffect(() => {
        getLiveDebateZoneList().then(response => {
            setLiveDebateZoneList(response);
        });

        getFeedDebateZoneList().then(response => {
            setFeedDebateZoneList(response);
        });

        return () => {
            setLiveDebateZoneList(undefined);
            setFeedDebateZoneList(undefined);
        };
    }, []);

    const live = () => {
        return (
            <View>
                <LiveListComponent outputDebateZoneList={liveDebateZoneList} />
            </View>
        );
    };

    const feed = () => {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#A9BBE2',
                }}
            >
                <FeedListComponent
                    feedDebateZoneList={feedDebateZoneList}
                    onPress={onFeedItemPress}
                />
            </View>
        );
    };

    return <HomeTabComponent live={live} feed={feed} />;
};
