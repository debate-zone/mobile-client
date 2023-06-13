import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CreatedDebateZone } from '../../../types/debateZone';
import { Text } from 'react-native-paper';
import React, { useEffect } from 'react';
import Toast from 'react-native-root-toast';

interface JoinDetailsProps {
    debateZone?: CreatedDebateZone;
    onJoin: () => Promise<CreatedDebateZone>;
}

export const JoinDetailsComponent = (props: JoinDetailsProps) => {
    const [debateZone, setDebateZone] = React.useState<
        CreatedDebateZone | undefined
    >(props.debateZone);
    const [isJoinDisabled, setIsJoinDisabled] = React.useState<boolean>();

    useEffect(() => {
        setDebateZone(props.debateZone);
    }, [props.debateZone]);

    const calculateTimeToStart = (date?: Date) => {
        const now = new Date();
        const timeToStart = new Date(date || now);
        if (timeToStart.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
            return timeToStart.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else {
            return timeToStart.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
        }
    };

    const getJoinButtonText = () => {
        if (debateZone?.isAlreadyJoined) {
            return 'Joined';
        } else if (debateZone?.isTimeExpired) {
            return 'Time expired';
        } else if (debateZone?.isAlreadyFinished) {
            return 'Finished';
        } else {
            return `Join for ${calculateTimeToStart(debateZone?.date)}`;
        }
    };

    useEffect(() => {
        if (debateZone) {
            setIsJoinDisabled(
                debateZone.isAlreadyFinished ||
                    debateZone.isAlreadyJoined ||
                    debateZone.isTimeExpired,
            );
        }
    }, [debateZone, isJoinDisabled]);

    return (
        <View
            style={{
                flexDirection: 'column',
            }}
        >
            <View
                key={`card-debate-zone-details-${debateZone?._id}`}
                style={{
                    backgroundColor: '#D9D9D9',
                    padding: 30,
                    marginTop: 40,
                    borderRadius: 21,
                    margin: 20,
                    height: '70%',
                    flexDirection: 'column',
                    shadowOffset: {
                        width: 4,
                        height: 5,
                    },
                    shadowColor: 'black',
                    shadowRadius: 12,
                    shadowOpacity: 0.2,
                }}
            >
                <Image
                    source={require('../../../../assets/avatar.png')}
                    style={{
                        alignSelf: 'center',
                    }}
                />
                <View
                    style={{
                        marginTop: 30,
                        position: 'absolute',
                        bottom: 30,
                        marginLeft: 20,
                        marginRight: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            marginBottom: 20,
                        }}
                    >
                        {debateZone?.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {debateZone?.shortDescription}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: 20,
                        }}
                    >
                        {debateZone ? debateZone.date.toLocaleString() : ''}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                disabled={isJoinDisabled}
                onPress={() => {
                    props.onJoin().then(debateZone => {
                        setDebateZone(debateZone);
                        Toast.show("You've joined the debate zone!", {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    });
                }}
            >
                <View
                    style={{
                        height: 66,
                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor: isJoinDisabled ? '#676767' : '#1f3c62',
                        flexDirection: 'row',
                        borderRadius: 21,
                        padding: 20,
                    }}
                >
                    <Image
                        source={require('../../../../assets/logo-white.png')}
                        resizeMode={'contain'}
                        style={{ height: 39, width: 36 }}
                    />

                    <Text style={styles.btnTextJoin}>
                        {getJoinButtonText()}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    btnTextJoin: {
        fontSize: 20,
        alignSelf: 'center',
        marginLeft: 13,
        color: '#ffffff',
    },
});
