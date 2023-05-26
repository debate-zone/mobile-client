import { LoginComponent } from '../../components/login/LoginComponent';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { getToken } from '../../utils/loginUtils';
import Toast from 'react-native-root-toast';
import { request } from '../../apiClient/apiClient';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

export const LoginScreen = ({ navigation }: RootScreenProps) => {
    const toNext = async () => {
        const token = await getToken();

        let user = undefined;

        try {
            const user = await request('GET', 'login', {});
        } catch (e) {
            Toast.show('Login failed', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        if (user.politicalPreference) {
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
