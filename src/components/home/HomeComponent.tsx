import { View, Text, Pressable } from 'react-native';
import { remove } from '../../store/secure/secureStoreService';
import { KeyEnum } from '../../store/secure/keyEnum';
import Toast from 'react-native-root-toast';

export const Home = () => {
    const logoutOnPress = async () => {
        try {
            await remove(KeyEnum.token);
            Toast.show('Logout success', {
                duration: Toast.durations.LONG,
            });
        } catch (e) {
            Toast.show('Logout failed', {
                duration: Toast.durations.LONG,
            });
        }
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Pressable
                onPress={logoutOnPress}
                style={{
                    borderStyle: 'solid',
                    position: 'absolute',
                    top: 60,
                    left: 20,
                }}
            >
                <Text>Logout</Text>
            </Pressable>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}
            >
                Home
            </Text>
        </View>
    );
};
