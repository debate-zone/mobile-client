import { RootSiblingParent } from 'react-native-root-siblings';
import React from 'react';
import RootNavigation from './src/navigation/rootNavigation';
import { PaperProvider } from 'react-native-paper';
//
export default function App() {
    return (
        <PaperProvider>
            <RootSiblingParent>
                <RootNavigation />
            </RootSiblingParent>
        </PaperProvider>
    );
}
