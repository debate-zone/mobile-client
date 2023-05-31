import { LoginComponent } from '../../components/login/LoginComponent';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Toast from 'react-native-root-toast';
import { request } from '../../apiClient/apiClient';
import { User } from '../../types/user';
import { useEffect } from 'react';
import { removeToken } from '../../utils/loginUtils';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

export const LoginScreen = ({ navigation }: RootScreenProps) => {
    const toNext = async () => {
        let user: User = undefined;

        try {
            user = await request<User>('POST', '/auth/login');
        } catch (e) {
            Toast.show('Login failed', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        if (user?.politicalPreference) {
            navigation.navigate('HomeScreen');
        } else {
            navigation.navigate('PoliticalPreferenceScreen');
        }
    };

    useEffect(() => {
        removeToken();
    }, []);

    return (
        <>
            <LoginComponent toNext={toNext} />
        </>
    );
};
