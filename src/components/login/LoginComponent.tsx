import React from 'react';
import { LoginAppleComponent } from './apple/LoginAppleComponent';
import { LoginGoogleComponent } from './google/LoginGoogleComponent';
import { LoginFacebookComponent } from './facebook/LoginFacebookComponent';
import { LoginCredentialsComponent } from './credentials/LoginCredentialsComponent';
// @ts-ignore
import { APPLE_CLIENT_ID } from '@env';
import { View } from 'react-native';

export type LoginComponentProps = {
    toNext: () => void;
};

export const LoginComponent = (loginComponentProps: LoginComponentProps) => {
    return (
        <>
            <LoginCredentialsComponent toNext={loginComponentProps.toNext} />
            {APPLE_CLIENT_ID ? (
                <LoginAppleComponent toNext={loginComponentProps.toNext} />
            ) : (
                <View />
            )}
            <LoginGoogleComponent toNext={loginComponentProps.toNext} />
            <LoginFacebookComponent toNext={loginComponentProps.toNext} />
        </>
    );
};
