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
import { JoinListScreen } from '../screens/joinListScreen/JoinListScreen';
import { JoinDetailsScreen } from '../screens/joinDetailsScreen/JoinDetailsScreen';

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
                    tokenPresent ? HomeScreen.name : LoginScreen.name
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
                        gestureEnabled: true,
                        headerTitle: '',
                    }}
                    name={'JoinDetailsScreen'}
                    component={JoinDetailsScreen}
                />
            </Stack.Navigator>
            {hideBar && <BottomBar />}
        </NavigationContainer>
    );
}
