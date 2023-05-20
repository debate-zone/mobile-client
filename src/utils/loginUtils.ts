import { get, save } from '../store/secure/secureStoreService';
import { KeyEnum } from '../store/secure/keyEnum';
import Toast from 'react-native-root-toast';
import { LoginTypeEnum } from '@/utils/loginTypeEnum';

export async function saveToken(
    token: string | null | undefined,
    loginType: LoginTypeEnum,
): Promise<void> {
    if (!token) {
        Toast.show('Token can`t be empty', {
            duration: Toast.durations.LONG,
        });
        return;
    }
    try {
        await save(KeyEnum.token, token);
        await save(KeyEnum.loginType, loginType);
        Toast.show('Login successfully.', {
            duration: Toast.durations.LONG,
        });
    } catch (e) {
        Toast.show('Saving token failed', {
            duration: Toast.durations.LONG,
        });
    }
}

export async function getToken(): Promise<string | null> {
    return await get(KeyEnum.token);
}

export async function isToken(): Promise<boolean> {
    const token: string | null = await get(KeyEnum.token);

    return token != null;
}

export const toastLoginFailed = () => {
    Toast.show('Login failed.', {
        duration: Toast.durations.LONG,
    });
};
