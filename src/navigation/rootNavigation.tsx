import { LoginScreen } from '../screens/loginScreen/LoginScreen';
import { PoliticalPreferenceScreen } from '../screens/politicalPreference/PoliticalPreferenceScreen';
import { HomeScreen } from '../screens/homeScreen/HomeScreen';
import { NewDebateZoneScreen } from '../screens/newDebateZoneScreen/NewDebateZoneScreen';
import React, { useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    NavigationContainer,
    useNavigationContainerRef,
} from '@react-navigation/native';
import BottomBar from '../../src/components/bottomBar/bottomBar';
import { ProfileScreen } from '../screens/profileScreen/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const [tokenPresent, setTokenPresent] = useState<boolean>(false);
    const [hideBar, setHideBar] = useState<boolean>(false);
    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef<string>();
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
                    if (
                        currentRouteName != LoginScreen.name ||
                        currentRouteName != PoliticalPreferenceScreen.name
                    ) {
                        setHideBar(true);
                    }
                };
                if (previousRouteName !== currentRouteName) {
                    routeNameRef.current = currentRouteName;
                }

                await trackScreenView(currentRouteName);
            }}
        >
            <Stack.Navigator
                initialRouteName={
                    tokenPresent ? HomeScreen.name : LoginScreen.name
                }
            >
                <Stack.Screen
                    name={LoginScreen.name}
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={'PoliticalPreferenceScreen'}
                    component={PoliticalPreferenceScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name={HomeScreen.name} component={HomeScreen} />
                <Stack.Screen
                    options={{
                        title: 'New Debate Zone',
                    }}
                    name={'NewDebateZoneScreen'}
                    component={NewDebateZoneScreen}
                />
                <Stack.Screen
                    options={{
                        title: 'Profile',
                    }}
                    name={'ProfileScreen'}
                    component={ProfileScreen}
                />
            </Stack.Navigator>
            {hideBar && <BottomBar />}
        </NavigationContainer>
    );
}
