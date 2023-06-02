import { get, save } from '../store/secure/secureStoreService';
import { KeyEnum } from '../store/secure/keyEnum';
import Toast from 'react-native-root-toast';
import { TokenProviderEnum } from '../enums/TokenProvider';
import { createError } from '../utils/error';

export type Token = {
    token: string;
    tokenProvider: TokenProviderEnum;
};

export async function saveToken(
    token: string | null | undefined,
    tokenProvider: TokenProviderEnum,
): Promise<void> {
    if (!token) {
        throw createError('Token is null or undefined');
    }
    try {
        await save(
            KeyEnum.token,
            JSON.stringify({
                token,
                tokenProvider,
            } as Token),
        );
    } catch (e) {
        throw createError('Token could not be saved');
    }
}

export async function getToken(): Promise<Token | null> {
    try {
        return JSON.parse(await get(KeyEnum.token));
    } catch (e) {
        return null;
    }
}

export async function removeToken(): Promise<void> {
    await save(KeyEnum.token, '');
}

export const toastLoginFailed = () => {
    Toast.show('Login failed.', {
        duration: Toast.durations.LONG,
    });
};
