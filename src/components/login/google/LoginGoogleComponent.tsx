import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Toast from 'react-native-root-toast';
import { saveToken } from '../../../utils/loginUtils';
import { TokenProviderEnum } from '../../../enums/TokenProvider';

import {
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
    EXPO_CLIENT_ID,
    // @ts-ignore
} from '@env';
import GoogleSvg from '../../../../src/components/svgIcons/google';

WebBrowser.maybeCompleteAuthSession();

export type LoginComponentProps = {
    toNext: () => void;
};

export const LoginGoogleComponent = (
    loginComponentProps: LoginComponentProps,
) => {
    const [token, setToken] = useState('');

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email', 'openid'],
        selectAccount: true,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            saveToken(
                response.authentication.accessToken,
                TokenProviderEnum.GOOGLE,
            ).then(() => {
                loginComponentProps.toNext();
            });
        } else {
            Toast.show('Uh oh, something went wrong');
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            >
                <GoogleSvg />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
