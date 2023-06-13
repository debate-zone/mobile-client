import { request } from '../../apiClient/apiClient';
import { CreatedDebateZone, NewDebateZone } from '../../types/debateZone';
import Toast from 'react-native-root-toast';
import { NewDebateZoneComponent } from '../../components/debateZone/newDetateZone/NewDebateZoneComponent';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'NewDebateZoneScreen'
    >;
}

export const NewDebateZoneScreen = ({ navigation }: RootScreenProps) => {
    const onSubmit = async (data: NewDebateZone) => {
        const createdDebateZone: CreatedDebateZone =
            await request<CreatedDebateZone>(
                'POST',
                '/debate-zone/v1/debate-zones/create',
                data,
            );

        Toast.show(`Debate zone "${createdDebateZone.title}" created`, {
            duration: Toast.durations.LONG,
        });

        navigation.navigate('JoinDetailsScreen', {
            id: createdDebateZone._id,
        });

        return createdDebateZone._id;
    };

    return (
        <>
            <NewDebateZoneComponent onSubmit={onSubmit} />
        </>
    );
};
