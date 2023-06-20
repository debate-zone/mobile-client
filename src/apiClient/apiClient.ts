import { getToken, Token } from '../utils/loginUtils';
// @ts-ignore
import { API_URL } from '@env';
import { createError } from '../utils/error';
import { CustomError, Method, SuccessBody } from '../types/requestResponse';
import {
    NavigationContext,
    useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';

async function formatError(response: Response) {
    const errorUnclearBody = await response.text();
    const errorBody = JSON.parse(errorUnclearBody);
    const objectErrorBodyMessages = JSON.parse(errorBody.error.message);

    let message = '';
    objectErrorBodyMessages.forEach(errorBodyMessage => {
        message += `${errorBodyMessage.path.join(' ')}: ${
            errorBodyMessage.message
        }\n`;
    });
    throw new CustomError(message, objectErrorBodyMessages);
}

const getAuthHeaders = async () => {
    const token: Token | null = await getToken();

    if (token) {
        return {
            Authorization: `Bearer ${token.token}`,
            'X-Auth-Provider': token.tokenProvider,
        };
    } else {
        return {};
    }
};

export async function request<T>(method: Method, path: string, body?: any) {
    try {
        const authHeaders = await getAuthHeaders();

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
            if (response.status === 401) {
                const navigation = React.useContext(NavigationContext);
                navigation?.navigate('LoginScreen');
                return;
            }
            await formatError(response);
        }
    } catch (error) {
        throw createError(error.message, error.messages);
    }
}
