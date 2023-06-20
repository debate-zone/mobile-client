import { Image, View } from 'react-native';
//@ts-ignore
import Avatar from '../../../../assets/debateZone/avatar.svg';

interface StreamComponentProps {}

export const StreamComponent = (props: StreamComponentProps) => {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Avatar with={100} height={100} color={'#ffff'} />
        </View>
    );
};
