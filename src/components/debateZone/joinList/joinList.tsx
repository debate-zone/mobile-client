import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import JoinItem from '../joinItem/joinItem';
import { OutputDebateZoneList } from '../../../types/debateZone';

type JoinListProps = {
    outputDebateZoneList?: OutputDebateZoneList;
    onPress?: (id: string) => void;
};

const JoinList: React.FC<JoinListProps> = ({
    outputDebateZoneList,
    onPress,
}) => {
    return (
        (outputDebateZoneList &&
            outputDebateZoneList.debateZones.length > 0 && (
                <FlatList
                    data={outputDebateZoneList.debateZones}
                    renderItem={({ item }) => (
                        <JoinItem
                            id={item._id}
                            title={item.title}
                            date={item.date}
                            isPrivate={item.isPrivate}
                            onPress={onPress}
                        />
                    )}
                    keyExtractor={item => item._id}
                    style={styles.container}
                />
            )) ||
        null
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
});
export default JoinList;
