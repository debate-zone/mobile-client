import { Image, View } from 'react-native';

interface StreamComponentProps {}

export const StreamComponent = (props: StreamComponentProps) => {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#A9BBE2',
            }}
        >
            <Image
                style={{
                    width: 100,
                    height: 120,
                }}
                source={require('../../../../assets/avatar.png')}
            />
        </View>
    );
};
