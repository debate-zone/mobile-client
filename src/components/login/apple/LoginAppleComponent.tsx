import * as AppleAuthentication from 'expo-apple-authentication';
import {TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';
import { saveToken, toastLoginFailed } from '../../../utils/loginUtils';
import { TokenProviderEnum } from '../../../enums/TokenProvider';
import AppleSvg from "../../../../src/components/svgIcons/apple";
// import styles from './LoginAppleComponent.module.scss';

export type LoginAppleComponentProps = {
    toNext: () => void;
};

export const LoginAppleComponent = (
    loginAppleComponentProps: LoginAppleComponentProps,
) => {
    async function onPress(): Promise<void> {
        try {
            const credential: AppleAuthentication.AppleAuthenticationCredential =
                await AppleAuthentication.signInAsync({
                    requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                });
            await saveToken(credential.identityToken, TokenProviderEnum.APPLE);
            loginAppleComponentProps.toNext();
        } catch (e) {
            console.log(e);
            if (e.code === 'ERR_REQUEST_CANCELED') {
                Toast.show('Request Canceled', {
                    duration: Toast.durations.LONG,
                });
            } else {
                toastLoginFailed();
            }
        }
    }

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity>
                <AppleSvg/>
            </TouchableOpacity>
        </View>
    );
};
