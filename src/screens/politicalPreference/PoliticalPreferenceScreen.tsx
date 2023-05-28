import PoliticalPreference from '../../components/preferance_page/PoliticalPreference';
import { request } from '../../apiClient/apiClient';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { User } from '../../types/user';

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
        console.log(politicalPreference);
        const user: User = await request<User>('POST', '/users/updateUser', {
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
