import React from 'react';
import { LoginAppleComponent } from './apple/LoginAppleComponent';
import { LoginGoogleComponent } from './google/LoginGoogleComponent';
import { LoginFacebookComponent } from './facebook/LoginFacebookComponent';
import { LoginCredentialsComponent } from './credentials/LoginCredentialsComponent';
import {View, Image, StyleSheet} from "react-native";
import LogoSvgComponent from "../../../src/components/svgIcons/logo1";
import CustomInput from "../../../src/components/UI/LoginInput/logininput";

export type LoginComponentProps = {
    toNext: () => void;
};

export const LoginComponent = (loginComponentProps: LoginComponentProps) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <LogoSvgComponent/>
                </View>

                <View style={styles.loginContainer}>
                    <LoginCredentialsComponent toNext={loginComponentProps.toNext} />
                </View>

                <View style={styles.socialButtons}>
                    <LoginAppleComponent toNext={loginComponentProps.toNext} />
                    <LoginGoogleComponent toNext={loginComponentProps.toNext} />
                    <LoginFacebookComponent toNext={loginComponentProps.toNext} />
                </View>
            </View>

        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBEAEA",
        alignItems: 'center',
    },
    logo: {
        top: 100,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialButtons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
    }
})