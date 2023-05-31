import { useState } from 'react';
import { getToken, saveToken } from '../../../utils/loginUtils';
import { TokenProviderEnum } from '../../../enums/TokenProvider';
import { Button, TextInput, View } from 'react-native';
import { request } from '../../../apiClient/apiClient';
import Toast from 'react-native-root-toast';

export type LoginComponentProps = {
    toNext: () => void;
};

export type OutputLoginCredentialsUser = {
    accessToken: string;
};

export const LoginCredentialsComponent = (
    loginComponentProps: LoginComponentProps,
) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (variables: { password: string; email: string }) => {
        try {
            const outputLoginCredentialsUser: OutputLoginCredentialsUser =
                await request<OutputLoginCredentialsUser>(
                    'POST',
                    '/auth/login-with-credentials',
                    variables,
                );

            await saveToken(
                outputLoginCredentialsUser.accessToken,
                TokenProviderEnum.CREDENTIALS,
            );

            loginComponentProps.toNext();
        } catch (e) {
            Toast.show(e.message, {
                duration: Toast.durations.LONG,
            });
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TextInput
                style={{
                    marginBottom: 10,
                }}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={{
                    marginBottom: 10,
                }}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Button
                title="Login"
                onPress={() => {
                    login({
                        email: email,
                        password: password,
                    });
                }}
            />
        </View>
    );
};
