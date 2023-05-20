import { RootSiblingParent } from 'react-native-root-siblings';
import React from 'react';
import RootNavigation from './src/navigation/rootNavigation';

export default function App() {
    return (
        <RootSiblingParent>
            <RootNavigation />
        </RootSiblingParent>
    );
}
