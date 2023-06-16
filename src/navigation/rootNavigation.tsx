import { LoginScreen } from '../screens/loginScreen/LoginScreen';
import { PoliticalPreferenceScreen } from '../screens/politicalPreference/PoliticalPreferenceScreen';
import { HomeScreen } from '../screens/homeScreen/HomeScreen';
import { NewDebateZoneScreen } from '../screens/newDebateZoneScreen/NewDebateZoneScreen';
import React, { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    NavigationContainer,
    useNavigationContainerRef,
} from '@react-navigation/native';
import BottomBar from '../../src/components/bottomBar/bottomBar';
import { ProfileScreen } from '../screens/profileScreen/ProfileScreen';
import { JoinListScreen } from '../screens/joinListScreen/JoinListScreen';
import { JoinDetailsScreen } from '../screens/joinDetailsScreen/JoinDetailsScreen';
import { getToken } from '../utils/loginUtils';
import { ActiveScreen } from '../screens/activeScreen/activeScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const [isTokenPresent, setTokenPresent] = useState<boolean>(false);
    const [hideBar, setHideBar] = useState<boolean>(false);
    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef<string>();

    useEffect(() => {
        getToken().then(token => {
            console.log('token', token);
            setTokenPresent(token !== null);
        });
    }, [isTokenPresent]);

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName =
                    navigationRef.current.getCurrentRoute().name;
                const trackScreenView = (currentRouteName: string) => {
                    const isShowBar = !(
                        currentRouteName === LoginScreen.name ||
                        currentRouteName === PoliticalPreferenceScreen.name
                    );

                    setHideBar(isShowBar);
                };
                if (previousRouteName !== currentRouteName) {
                    routeNameRef.current = currentRouteName;
                }

                await trackScreenView(currentRouteName);
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
                initialRouteName={
                    isTokenPresent ? HomeScreen.name : LoginScreen.name
                }
            >
                <Stack.Screen name={LoginScreen.name} component={LoginScreen} />
                <Stack.Screen
                    name={'PoliticalPreferenceScreen'}
                    component={PoliticalPreferenceScreen}
                />
                <Stack.Screen name={HomeScreen.name} component={HomeScreen} />
                <Stack.Screen
                    name={'NewDebateZoneScreen'}
                    component={NewDebateZoneScreen}
                />
                <Stack.Screen
                    name={'ProfileScreen'}
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name={'JoinListScreen'}
                    component={JoinListScreen}
                />
                <Stack.Screen
                    options={{
                        headerShown: true,
                        headerTintColor: '#fff',
                        headerTransparent: true,
                        gestureEnabled: true,
                        headerTitle: '',
                    }}
                    name={'JoinDetailsScreen'}
                    component={JoinDetailsScreen}
                />
                <Stack.Screen name={'ActiveScreen'} component={ActiveScreen} />
            </Stack.Navigator>
            {hideBar && <BottomBar />}
        </NavigationContainer>
    );
}
