import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import Toast from 'react-native-root-toast';
import { saveToken } from '../../../utils/loginUtils';
import { LoginTypeEnum } from '../../../utils/loginTypeEnum';

WebBrowser.maybeCompleteAuthSession();

export type LoginComponentProps = {
    toNext: () => void;
};

export const LoginFacebookComponent = (
    loginComponentProps: LoginComponentProps,
) => {
    const [user, setUser] = useState(null);
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        androidClientId: process.env.FB_ANDROID_CLIENT_ID,
        iosClientId: process.env.FB_IOS_CLIENT_ID,
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
            saveToken(response.authentication.accessToken, LoginTypeEnum.fb);
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
            {user ? (
                <Profile user={user} />
            ) : (
                <Button
                    disabled={!request}
                    title="Sign in with Facebook"
                    onPress={handlePressAsync}
                />
            )}
        </View>
    );
};

function Profile({ user }) {
    return (
        <View style={styles.profile}>
            <Image
                source={{ uri: user.picture.data.url }}
                style={styles.image}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text>ID: {user.id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
