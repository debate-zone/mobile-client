import { FeedDetailsComponent } from '../../../components/home/feed/details/feedDetailsComponent';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../../types';
import { useEffect, useState } from 'react';
import { OutputDebateZoneListItem } from '../../../types/debateZone';
import { request } from '../../../apiClient/apiClient';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'FeedDetailsScreen'
    >;
    route: any;
}

export const FeedDetailsScreen = ({ navigation, route }: RootScreenProps) => {
    const [debateZone, setDebateZone] =
        useState<OutputDebateZoneListItem>(undefined);

    const getFeedDebateZoneDetails = async () => {
        return request<OutputDebateZoneListItem>(
            'GET',
            `/debate-zone/v1/debate-zones/feed/details?id=${route?.params?.debateZoneId}`,
        );
    };
    useEffect(() => {
        getFeedDebateZoneDetails().then(response => {
            setDebateZone(response);
        });
        return () => {
            setDebateZone(undefined);
        };
    }, []);

    return <FeedDetailsComponent debateZone={debateZone} />;
};
