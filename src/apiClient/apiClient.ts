import Toast from 'react-native-root-toast';
import { getToken, Token } from '../utils/loginUtils';
// @ts-ignore
import { API_URL } from '@env';

export async function request<T>(method: string, path: string, body?: any) {
    try {
        const token: Token = await getToken();
        const response = await fetch(API_URL + path, {
            method,
            headers: {
                Authorization: `Bearer ${token.token}`,
                'X-Auth-Provider': token.tokenProvider,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
        });
        return (await response.json()) as T;
    } catch (error) {
        Toast.show('Error on fetching data', {
            duration: Toast.durations.LONG,
        });
        throw error;
    }
}
