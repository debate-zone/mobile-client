import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import JoinItem, {
    JoinItemProps,
} from '../../../../src/components/UI/joinItem/joinItem';
import { OutputDebateZoneList } from '@/types/debateZone';

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
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                />
            )) || (
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 20,
                    marginTop: 30,
                }}
            >
                There are no debate zones in near future
            </Text>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
});
export default JoinList;
