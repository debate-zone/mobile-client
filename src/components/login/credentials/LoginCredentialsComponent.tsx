import { useState } from 'react';
import { saveToken } from '../../../utils/loginUtils';
import { TokenProviderEnum } from '../../../enums/TokenProvider';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
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
    props,
) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (variables: { password: string; email: string }) => {
        try {
            const outputLoginCredentialsUser: OutputLoginCredentialsUser =
                await request<OutputLoginCredentialsUser>(
                    'POST',
                    '/user/v1/auth/login-with-credentials',
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
                width: '100%',
            }}
            {...props}
        >
            <TextInput
                style={{
                    backgroundColor: '#ffffff',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 1,
                    marginTop: 15,
                    width: '66%',
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 21,
                    paddingHorizontal: 10,
                    marginBottom: 2,
                }}
                placeholder="Email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={{
                    backgroundColor: '#ffffff',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 1,
                    marginTop: 15,
                    width: '66%',
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 21,
                    paddingHorizontal: 10,
                    marginBottom: 2,
                }}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: '#ffffff',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 1,
                    borderRadius: 21,
                    height: 50,
                    width: 103,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                }}
                onPress={() => {
                    login({
                        email: email,
                        password: password,
                    });
                }}
            >
                <Text
                    style={{
                        color: '#717171',
                        fontSize: 17,
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};
