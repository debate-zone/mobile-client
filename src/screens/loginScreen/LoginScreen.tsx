import { LoginComponent } from '../../components/login/LoginComponent';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Toast from 'react-native-root-toast';
import { request } from '../../apiClient/apiClient';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

export const LoginScreen = ({ navigation }: RootScreenProps) => {
    const toNext = async () => {
        let user = undefined;

        try {
            const user = await request<{ politicalPreference: string }>(
                'GET',
                '/auth/login',
                {},
            );
        } catch (e) {
            Toast.show('Login failed', {
                duration: Toast.durations.LONG,
            });
        }

        if (user?.politicalPreference) {
            navigation.navigate('HomeScreen');
        }

        navigation.navigate('PoliticalPreferenceScreen');
    };

    return (
        <>
            <LoginComponent toNext={toNext} />
        </>
    );
};
