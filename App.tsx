import { RootSiblingParent } from 'react-native-root-siblings';
import React from 'react';
import RootNavigation from './src/navigation/rootNavigation';
import { PaperProvider } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
    useKeepAwake();

    return (
        <PaperProvider>
            <RootSiblingParent>
                <RootNavigation />
            </RootSiblingParent>
        </PaperProvider>
    );
}
