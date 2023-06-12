import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { ActiveComponent } from '../../components/debateZone/active/activeComponent';
import { useEffect, useState } from 'react';
import { CreatedDebateZone } from '../../types/debateZone';
import { request } from '../../apiClient/apiClient';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ActiveScreen'>;
    route: any;
}

export const ActiveScreen = ({ navigation, route }: RootScreenProps) => {
    const [debateZone, setDebateZone] = useState<CreatedDebateZone>(undefined);

    const getDebateZoneById = () => {
        return request<CreatedDebateZone>(
            'GET',
            `/debate-zones/active/details?id=${route.props.debateZoneId}`,
        );
    };

    useEffect(() => {
        getDebateZoneById().then(debateZone => {
            setDebateZone(debateZone);
        });
    }, []);

    return <ActiveComponent debateZone={debateZone} />;
};
