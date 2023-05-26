import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Toast from 'react-native-root-toast';
import { saveToken } from '../../../utils/loginUtils';
import { TokenProviderEnum } from '../../../enums/TokenProvider';

WebBrowser.maybeCompleteAuthSession();

export type LoginComponentProps = {
    toNext: () => void;
};

export const LoginGoogleComponent = (
    loginComponentProps: LoginComponentProps,
) => {
    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            saveToken(
                response.authentication.accessToken,
                TokenProviderEnum.GOOGLE,
            );
            setToken(response.authentication.accessToken);
            getUserInfo();
        }
    }, [response, token]);

    const getUserInfo = async () => {
        try {
            const response = await fetch(
                'https://www.googleapis.com/userinfo/v2/me',
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            const user = await response.json();
            setUserInfo(user);
        } catch (error) {
            Toast.show(`Something happened wrong on retrieve user`, {
                duration: Toast.durations.LONG,
            });
        }
    };

    return (
        <View style={styles.container}>
            {userInfo === null ? (
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                />
            ) : (
                <Text style={styles.text}>{userInfo.name}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
