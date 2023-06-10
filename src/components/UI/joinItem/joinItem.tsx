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
    shortDescription?: string;
    onPress?: (id: string) => void;
};

const JoinItem: React.FC<JoinItemProps> = ({
    id,
    title,
    shortDescription,
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
                    key={`card-content-shortDescription-${id}`}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {shortDescription}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    console.log('JoinItem.tsx: onPress: ' + id);
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
    },
});

export default JoinItem;
