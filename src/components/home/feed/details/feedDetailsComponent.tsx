import { Text, View } from 'react-native';
import { ShortDescriptionComponent } from '../../../../components/debateZone/shortDescription/shortDescriptionComponent';
import { OutputDebateZoneListItem } from '../../../../types/debateZone';

interface FeedDetailsComponentProps {
    debateZone: OutputDebateZoneListItem;
}

export const FeedDetailsComponent = (props: FeedDetailsComponentProps) => {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#D9D9D9',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 10,
            }}
        >
            <ShortDescriptionComponent
                shortDescription={props?.debateZone?.shortDescription}
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: '#D9D9D9',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                }}
            >
                {/*todo full video webm*/}
                <Text>scroll video stream and likes with comments</Text>
            </View>
        </View>
    );
};
