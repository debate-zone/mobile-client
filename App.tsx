import { RootSiblingParent } from 'react-native-root-siblings';
import React from 'react';
import RootNavigation from './src/navigation/rootNavigation';
import {HomeScreen} from './src/screens/homeScreen/HomeScreen'
export default function App() {
    return (
        <RootSiblingParent>
            <RootNavigation />
        </RootSiblingParent>
    );
}


// export default function App() {
//     return (
//         <HomeScreen navigation={null}/>
//     );
// }