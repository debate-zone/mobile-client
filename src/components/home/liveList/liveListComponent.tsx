import { FlatList, Text, View } from 'react-native';
import { OutputDebateZoneList } from '../../../types/debateZone';
import { randomUUID } from 'expo-crypto';

interface LiveListComponentProps {
    outputDebateZoneList: OutputDebateZoneList;
}

export const LiveListComponent = (props: LiveListComponentProps) => {
    return (
        ((props.outputDebateZoneList?.debateZones?.length ?? 0) > 0 && (
            <FlatList
                data={props.outputDebateZoneList?.debateZones}
                scrollEnabled={true}
                keyExtractor={value => {
                    if (value._id) {
                        return value._id;
                    } else {
                        return 'new-' + randomUUID();
                    }
                }}
                renderItem={value => {
                    return (
                        <Text
                            style={{
                                fontSize: 25,
                                padding: 10,
                                margin: 10,
                            }}
                        >
                            {value.item.title}
                        </Text>
                    );
                }}
            />
        )) || (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#A9BBE2',
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                    }}
                >
                    No live debates
                </Text>
            </View>
        )
    );
};
