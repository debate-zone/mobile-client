import { request } from '../../apiClient/apiClient';
import { CreatedDebateZone, NewDebateZone } from '../../types/debateZone';
import Toast from 'react-native-root-toast';
import { NewDebateZoneComponent } from '../../components/debateZone/newDetateZone/NewDebateZoneComponent';

export const NewDebateZoneScreen = () => {
    const onSubmit = async (data: NewDebateZone) => {
        const createdDebateZone: CreatedDebateZone =
            await request<CreatedDebateZone>(
                'POST',
                '/debate-zones/create',
                data,
            );

        Toast.show(`Debate zone "${createdDebateZone.title}" created`, {
            duration: Toast.durations.LONG,
        });

        return createdDebateZone._id;
    };

    return (
        <>
            <NewDebateZoneComponent onSubmit={onSubmit} />
        </>
    );
};
