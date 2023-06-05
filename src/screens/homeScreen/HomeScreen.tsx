import { Home } from '../../components/home/HomeComponent';
import BottomBar from "../../../src/components/bottomBar/bottomBar";
import {Text, View} from "react-native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "@/types";

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
}
export const HomeScreen = ({ navigation }: RootScreenProps) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Text>HomeScreen</Text>
        </View>
    );
};
