import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import Toast from 'react-native-root-toast';
import { saveToken } from '../../../utils/loginUtils';
import { TokenProviderEnum } from '../../../enums/TokenProvider';
// @ts-ignore
import { FACEBOOK_APP_ID } from '@env';
import FacebookSvg from '../../../../src/components/svgIcons/facebook';

WebBrowser.maybeCompleteAuthSession();

export type LoginComponentProps = {
    toNext: () => void;
};

export const LoginFacebookComponent = (
    loginComponentProps: LoginComponentProps,
) => {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: FACEBOOK_APP_ID,
    });

    if (request) {
        Toast.show(
            'You need to add this url to your authorized redirect urls on your Facebook app: ' +
                request.redirectUri,
        );
    }

    useEffect(() => {
        if (
            response &&
            response.type === 'success' &&
            response.authentication
        ) {
            saveToken(
                response.authentication.accessToken,
                TokenProviderEnum.FACEBOOK,
            ).then(() => {
                loginComponentProps.toNext();
            });
        }
    }, [response]);

    const handlePressAsync = async () => {
        const result = await promptAsync();
        if (result.type !== 'success') {
            Toast.show('Uh oh, something went wrong');
            return;
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity disabled={!request} onPress={handlePressAsync}>
                <FacebookSvg />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
