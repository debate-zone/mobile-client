import { Text, View } from 'react-native';
import { CreatedDebateZone } from '../../../types/debateZone';
import { TimeComponent } from '../../../components/debateZone/time/timeComponent';

interface ActiveComponentProps {
    debateZone: CreatedDebateZone;
}

export const ActiveComponent = ({ debateZone }: ActiveComponentProps) => {
    return (
        <View
            style={{
                backgroundColor: '#A9BBE2',
                width: '100%',
                height: '100%',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '10%',
                    width: '100%',
                }}
            >
                <TimeComponent time={debateZone.rounds[0].time} />
            </View>
        </View>
    );
};
