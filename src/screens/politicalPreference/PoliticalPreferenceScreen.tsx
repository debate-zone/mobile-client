import { PoliticalPreferenceComponent } from '../../components/politicalPreference/PoliticalPreferenceComponent';
import { request } from '../../apiClient/apiClient';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import {
    PoliticalPreference,
    PoliticalPreferenceEnum,
    User,
} from '../../types/user';
import { useEffect, useState } from 'react';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'PoliticalPreferenceScreen'
    >;
}

export const PoliticalPreferenceScreen = ({ navigation }: RootScreenProps) => {
    const [politicalPreferences, setPoliticalPreferences] = useState<
        PoliticalPreference[]
    >([]);

    const onPoliticalPreferenceSelected = async (
        politicalPreference: PoliticalPreferenceEnum,
    ) => {
        const user: User = await request<User>('PUT', '/users/updateUser', {
            politicalPreference,
        });

        if (user.politicalPreference) {
            navigation.navigate('HomeScreen');
        }
    };

    const onPoliticalPreferenceSkipped = async () => {
        navigation.navigate('HomeScreen');
    };

    const retrievePoliticalPreferences = async () => {
        const politicalPreferences = await request<{
            politicalPreferences: PoliticalPreference[];
        }>('GET', '/users/politicalPreferences/list');

        return politicalPreferences.politicalPreferences;
    };

    useEffect(() => {
        retrievePoliticalPreferences().then(politicalPreferences => {
            setPoliticalPreferences(politicalPreferences);
        });
    }, []);

    return (
        <>
            <PoliticalPreferenceComponent
                politicalPreferences={politicalPreferences}
                onPoliticalPreferenceSelected={onPoliticalPreferenceSelected}
                onPoliticalPreferenceSkipped={onPoliticalPreferenceSkipped}
            />
        </>
    );
};
