import { LoginComponent } from '../../components/login/LoginComponent';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { getToken } from '../../utils/loginUtils';
import Toast from 'react-native-root-toast';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

export const LoginScreen = ({ navigation }: RootScreenProps) => {
    const toNext = async () => {
        const token = await getToken();

        let user = undefined;

        try {
            const response = await fetch('http://localhost:8090/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            user = await response.json();
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
