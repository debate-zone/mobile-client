import { OutputDebateZoneListItem } from '../../../../types/debateZone';
import { View, Pressable } from 'react-native';
import { ShortDescriptionComponent } from '../../../debateZone/shortDescription/shortDescriptionComponent';

interface FeedDebateZoneItemComponentProps {
    feedDebateZoneItem: OutputDebateZoneListItem;
    onPress: (debateZoneId: string) => void;
}
export const FeedDebateZoneItemComponent = (
    props: FeedDebateZoneItemComponentProps,
) => {
    return (
        <Pressable
            onPress={() => {
                props.onPress(props.feedDebateZoneItem._id);
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#D9D9D9',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 21,
                    padding: 10,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowColor: 'black',
                    shadowRadius: 12,
                    shadowOpacity: 0.2,
                }}
            >
                <ShortDescriptionComponent
                    shortDescription={props.feedDebateZoneItem.shortDescription}
                    isOnlyShow={true}
                />
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {/* todo short media */}
                </View>
            </View>
        </Pressable>
    );
};
