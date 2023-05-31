import { getToken, Token } from '../utils/loginUtils';
// @ts-ignore
import { API_URL } from '@env';

type ErrorBody = {
    status: string;
    error: {
        message: string;
    };
};

type SuccessBody<T> = {
    status: string;
    data: T;
};
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function request<T>(method: Method, path: string, body?: any) {
    try {
        const token: Token | null = await getToken();

        let authHeaders = undefined;

        if (token) {
            authHeaders = {
                Authorization: `Bearer ${token.token}`,
                'X-Auth-Provider': token.tokenProvider,
            };
        }

        const response = await fetch(API_URL + path, {
            method,
            headers: {
                ...authHeaders,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            return ((await response.json()) as SuccessBody<T>).data;
        } else {
            const errorBody: ErrorBody = (await response.json()) as ErrorBody;
            throw Error(errorBody.error.message);
        }
    } catch (error) {
        throw error;
    }
}
