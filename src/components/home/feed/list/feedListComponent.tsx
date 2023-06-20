import { OutputDebateZoneList } from '../../../../types/debateZone';
import { Dimensions, FlatList, View, Text } from 'react-native';
import { FeedDebateZoneItemComponent } from './feedDebateZoneItemComponent';

interface FeedListComponentProps {
    feedDebateZoneList: OutputDebateZoneList;
    onPress: (debateZoneId: string) => void;
}
export const FeedListComponent = (props: FeedListComponentProps) => {
    return (
        (props?.feedDebateZoneList?.debateZones?.length > 0 && (
            <FlatList
                data={props?.feedDebateZoneList?.debateZones}
                renderItem={value => {
                    return (
                        <View
                            style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height / 1.9,
                                padding: 20,
                            }}
                        >
                            <FeedDebateZoneItemComponent
                                feedDebateZoneItem={value.item}
                                onPress={props.onPress}
                            />
                        </View>
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
                    No debates
                </Text>
            </View>
        )
    );
};
