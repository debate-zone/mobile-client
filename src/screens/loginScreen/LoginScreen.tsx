import { LoginComponent } from '../../components/login/LoginComponent';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Toast from 'react-native-root-toast';
import { request } from '../../apiClient/apiClient';
import { User } from '../../types/user';
import { saveUser } from '../../utils/loginUtils';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

export const LoginScreen = ({ navigation }: RootScreenProps) => {
    const toNext = async () => {
        setTimeout(async () => {
            let user: User = undefined;

            try {
                user = await request<User>('POST', '/auth/login');
                console.log('user:', user);
                await saveUser(user);
            } catch (e) {
                console.log(e.message);
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
        }, 1000);
    };

    return (
        <>
            <LoginComponent toNext={toNext} />
        </>
    );
};
