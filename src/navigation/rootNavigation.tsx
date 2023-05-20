import { LoginScreen } from '../screens/loginScreen/LoginScreen';
import { PoliticalPreferenceScreen } from '../screens/politicalPreference/PoliticalPreferenceScreen';
import { HomeScreen } from '../screens/homeScreen/HomeScreen';
import { NewDebateZoneScreen } from '../screens/newDebateZoneScreen/NewDebateZoneScreen';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const [tokenPresent, setTokenPresent] = useState<boolean>(false);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={LoginScreen.name}
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={PoliticalPreferenceScreen.name}
                    component={PoliticalPreferenceScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name={HomeScreen.name} component={HomeScreen} />
                <Stack.Screen
                    name={NewDebateZoneScreen.name}
                    component={NewDebateZoneScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
