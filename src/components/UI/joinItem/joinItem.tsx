import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import JoinItemBtnSvg from '../../svgIcons/joinItemBtn';

export type JoinItemProps = {
    id?: string;
    title?: string;
    date?: Date;
    isPrivate?: boolean;
    onPress?: (id: string) => void;
};

const JoinItem: React.FC<JoinItemProps> = ({
    id,
    title,
    date,
    isPrivate,
    onPress,
}) => {
    return (
        <View key={`card-${id}`} style={styles.itemContainer}>
            <View key={`card-content-${id}`}>
                <Text
                    key={`card-content-title-${id}`}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {title}
                </Text>
                <Text
                    key={`card-content-description-${id}`}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {date && date.toString()}
                </Text>
                <View key={`card-private-${id}`}>
                    {isPrivate && (
                        <Text
                            style={{
                                marginTop: 5,
                                color: 'red',
                            }}
                            key={`card-private-text-${id}`}
                        >
                            Private
                        </Text>
                    )}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    onPress(id);
                }}
            >
                <JoinItemBtnSvg />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.9,
        height: 66,
        alignSelf: 'center',
        margin: 8,
        padding: 10,
        borderWidth: 1,
        borderRadius: 21,
        backgroundColor: 'white',
        borderColor: 'gray',
        shadowOffset: {
            width: 4,
            height: 5,
        },
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOpacity: 0.2,
    },
});

export default JoinItem;
