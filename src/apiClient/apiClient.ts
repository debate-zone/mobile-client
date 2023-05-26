import Toast from 'react-native-root-toast';
import { getToken, Token } from '../utils/loginUtils';

export async function request<T>(method: string, path: string, body?: any) {
    try {
        const token: Token = await getToken();
        const response = await fetch(process.env.API_URL + path, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`,
                'X-Auth-Provider': token.tokenProvider,
            },
            body: JSON.stringify(body),
        });
        return (await response.json()) as T;
    } catch (error) {
        Toast.show('Error on fetching data', {
            duration: Toast.durations.LONG,
        });
    }
}
