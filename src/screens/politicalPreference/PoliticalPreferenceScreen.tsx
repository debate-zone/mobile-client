import PoliticalPreference from '../../components/preferance_page/PoliticalPreference';
import { request } from '../../apiClient/apiClient';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'PoliticalPreferenceScreen'
    >;
}

export const PoliticalPreferenceScreen = ({ navigation }: RootScreenProps) => {
    const onPoliticalPreferenceSelected = async (
        politicalPreference: string,
    ) => {
        const user = await request<{
            politicalPreference: string;
        }>('POST', '/users/updateUser', {
            politicalPreference,
        });

        if (user.politicalPreference) {
            navigation.navigate('HomeScreen');
        }
    };

    const onPoliticalPreferenceSkipped = async () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <PoliticalPreference
            onPoliticalPreferenceSelected={onPoliticalPreferenceSelected}
            onPoliticalPreferenceSkipped={onPoliticalPreferenceSkipped}
        />
    );
};
