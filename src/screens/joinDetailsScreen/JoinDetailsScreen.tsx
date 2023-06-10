import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { View } from 'react-native';
import { request } from '../../apiClient/apiClient';
import {
    CreatedDebateZone,
    OutputDebateZoneListItem,
} from '../../types/debateZone';
import { JoinDetailsComponent } from '../../components/debateZone/joinDetails/JoinDetailsComponent';
import { useEffect, useState } from 'react';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'JoinDetailsScreen'
    >;
    route: any;
}

export const JoinDetailsScreen = ({ navigation, route }: RootScreenProps) => {
    const [debateZone, setDebateZone] = useState<CreatedDebateZone>(undefined);

    const getDebateZoneById = async () => {
        const debateZone = await request<CreatedDebateZone>(
            'GET',
            `/debate-zones/details?id=${route.params.id}`,
        );
        return debateZone;
    };

    const joinDebateZone = async () => {
        const debateZone = await request<CreatedDebateZone>(
            'POST',
            `/debate-zones/join`,
            {
                id: route.params.id,
            },
        );
        return debateZone;
    };

    useEffect(() => {
        if (route.params?.id && !debateZone) {
            getDebateZoneById().then(debateZone => {
                setDebateZone(debateZone);
            });
        }
    }, []);

    return (
        <View
            style={{
                backgroundColor: '#A9BBE2',
                width: '100%',
                height: '100%',
            }}
        >
            <JoinDetailsComponent
                debateZone={debateZone}
                onJoin={joinDebateZone}
            />
        </View>
    );
};
