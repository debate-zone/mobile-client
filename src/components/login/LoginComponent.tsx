import React from 'react';
import { LoginAppleComponent } from './apple/LoginAppleComponent';
import { LoginGoogleComponent } from './google/LoginGoogleComponent';
import { LoginFacebookComponent } from './facebook/LoginFacebookComponent';
import { LoginCredentialsComponent } from './credentials/LoginCredentialsComponent';

export type LoginComponentProps = {
    toNext: () => void;
};

export const LoginComponent = (loginComponentProps: LoginComponentProps) => {
    return (
        <>
            <LoginCredentialsComponent toNext={loginComponentProps.toNext} />
            <LoginAppleComponent toNext={loginComponentProps.toNext} />
            <LoginGoogleComponent toNext={loginComponentProps.toNext} />
            <LoginFacebookComponent toNext={loginComponentProps.toNext} />
        </>
    );
};
