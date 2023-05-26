import { get, save } from '../store/secure/secureStoreService';
import { KeyEnum } from '../store/secure/keyEnum';
import Toast from 'react-native-root-toast';
import { TokenProviderEnum } from '../enums/TokenProvider';

export type Token = {
    token: string;
    tokenProvider: TokenProviderEnum;
};

export async function saveToken(
    token: string | null | undefined,
    tokenProvider: TokenProviderEnum,
): Promise<void> {
    if (!token) {
        Toast.show('Token can`t be empty', {
            duration: Toast.durations.LONG,
        });
        return;
    }
    try {
        await save(
            KeyEnum.token,
            JSON.stringify({
                token,
                tokenProvider,
            } as Token),
        );
        Toast.show('Login successfully.', {
            duration: Toast.durations.LONG,
        });
    } catch (e) {
        Toast.show('Saving token failed', {
            duration: Toast.durations.LONG,
        });
    }
}

export async function getToken(): Promise<Token | null> {
    return JSON.parse(await get(KeyEnum.token));
}

export const toastLoginFailed = () => {
    Toast.show('Login failed.', {
        duration: Toast.durations.LONG,
    });
};
