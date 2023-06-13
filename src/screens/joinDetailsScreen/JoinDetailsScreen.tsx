import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { View } from 'react-native';
import { request } from '../../apiClient/apiClient';
import { CreatedDebateZone } from '../../types/debateZone';
import { JoinDetailsComponent } from '../../components/debateZone/joinDetails/joinDetailsComponent';
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
            `/debate-zone/v1/debate-zones/details?id=${route.params.id}`,
        );
        return debateZone;
    };

    const joinDebateZone = async () => {
        const debateZone = await request<CreatedDebateZone>(
            'POST',
            `/debate-zone/v1/debate-zones/join`,
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
                paddingTop: 60,
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
