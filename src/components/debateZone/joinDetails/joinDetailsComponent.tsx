import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    CreatedDebateZone,
    CreatedParticipant,
    ParticipantStatus,
} from '../../../types/debateZone';
import { Text } from 'react-native-paper';
import React, { useEffect } from 'react';
import Toast from 'react-native-root-toast';
//@ts-ignore
import Avatar from '../../../../assets/debateZone/avatar.svg';
//@ts-ignore
import Logo from '../../../../assets/logo.svg';
import { getUser } from '../../../utils/loginUtils';

interface JoinDetailsProps {
    debateZone?: CreatedDebateZone;
    onJoin: (status: ParticipantStatus) => Promise<CreatedDebateZone>;
}

export const JoinDetailsComponent = (props: JoinDetailsProps) => {
    const [debateZone, setDebateZone] = React.useState<
        CreatedDebateZone | undefined
    >(props.debateZone);
    const [isJoinDisabled, setIsJoinDisabled] = React.useState<boolean>();
    const [joinButtonText, setJoinButtonText] = React.useState<string>('');
    const [participantStatus, setParticipantStatus] =
        React.useState<ParticipantStatus>();

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

    const getParticipantStatus = async (): Promise<ParticipantStatus> => {
        const user = await getUser();
        const participant = debateZone?.participants?.find(
            participant => participant.userId === user?._id,
        );
        return participant?.status;
    };

    const getJoinButtonText = async (): Promise<'Left' | 'Join'> => {
        const participantStatus = await getParticipantStatus();

        switch (participantStatus) {
            case ParticipantStatus.ACCEPTED:
                return 'Left';
            default:
                return 'Join';
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

    useEffect(() => {
        getJoinButtonText().then(joinButtonText => {
            setJoinButtonText(joinButtonText);
        });
        getParticipantStatus().then(participantStatus => {
            setParticipantStatus(participantStatus);
        });
    }, [debateZone?.participants]);

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
                <Avatar with={100} height={100} color={'#ffff'} />
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
                onPress={() => {
                    props
                        .onJoin(
                            participantStatus === ParticipantStatus.ACCEPTED
                                ? ParticipantStatus.LEFT
                                : ParticipantStatus.ACCEPTED,
                        )
                        .then(debateZone => {
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
                        backgroundColor: '#1f3c62',
                        flexDirection: 'row',
                        borderRadius: 21,
                        padding: 20,
                    }}
                >
                    <Logo height={39} width={36} />

                    <Text style={styles.btnTextJoin}>
                        {joinButtonText || 'Join'}
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
