import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { ActiveComponent } from '../../components/debateZone/active/activeComponent';
import { useEffect, useState } from 'react';
import {
    CreatedDebateZone,
    OutputComment,
    OutputCommentList,
} from '../../types/debateZone';
import { request } from '../../apiClient/apiClient';
import { socketIo } from '../../utils/socketIo';
import { Socket } from 'socket.io-client';
import {randomUUID} from "expo-crypto";
import Toast from "react-native-root-toast";

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ActiveScreen'>;
    route: any;
}

export const ActiveScreen = ({ navigation, route }: RootScreenProps) => {
    const [debateZone, setDebateZone] = useState<CreatedDebateZone>(undefined);
    const [commentsList, setCommentsList] =
        useState<OutputCommentList>(undefined);
    const [isCommentsShown, setIsCommentsShown] = useState<boolean>(true);
    const [socket, setSocket] = useState<Socket>(undefined);

    const getDebateZoneById = () => {
        return request<CreatedDebateZone>(
            'GET',
            `/debate-zone/v1/debate-zones/active/details?id=${route.params.debateZoneId}`,
        );
    };

    const onCommentsShow = () => {
        setIsCommentsShown(true);
    };

    const getCommentsList = () => {
        console.log('getCommentsList');
        return request<OutputCommentList>(
            'GET',
            `/comment/v1/comments/list/?debateZoneId=${route.params.debateZoneId}`,
        );
    };

    const deleteCommentFromList = (comment: OutputComment) => {
        setCommentsList(commentsList => {
            return {
                ...commentsList,
                comments: commentsList.comments.filter(
                    x => x._id !== comment._id,
                ),
            };
        });
    };

    const addCommentToList = (comment: OutputComment) => {
        setCommentsList(commentsList => {
            return {
                ...commentsList,
                comments: [comment, ...commentsList.comments],
            };
        });
    };

    const onCommentNew = (text: string) => {
        try {
            socket.emit('onNewComment', {
                text: text,
            })
            addCommentToList(
                {
                    _id: randomUUID(),
                    text: text,
                    userFullName: 'You',
                    userId: randomUUID(),
                    debateZoneId: route.params.debateZoneId,
                }
            )
        } catch (e) {
            Toast.show('Error while sending comment', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
            })
        }
    };

    const onCommentReply = (comment: OutputComment) => {
        console.log('onCommentReply not implemented yet', comment);
    };

    const onCommentDelete = (comment: OutputComment) => {
        try {
            socket.emit('onDeleteComment', {
                id: comment._id,
            });
            deleteCommentFromList(comment);
        } catch (e) {
            Toast.show('Error while deleting comment', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
            })
        }
    };

    useEffect(() => {
        getDebateZoneById().then(debateZone => {
            setDebateZone(debateZone);
        });
        if (isCommentsShown) {
            getCommentsList().then(commentsList => {
                setCommentsList(commentsList);
            });
        }
    }, [route.params.debateZoneId]);

    useEffect(() => {
        let socketLocal: Socket | undefined;

        socketIo(route.params.debateZoneId).then(thisSocket => {
            socketLocal = thisSocket;
            setSocket(thisSocket);
            thisSocket.on(
                'broadcastEmitNewComment',
                (comment: OutputComment) => {
                    addCommentToList(comment);
                },
            );
            thisSocket.on(
                'broadcastEmitDeletedComment',
                (comment: OutputComment) => {
                    deleteCommentFromList(comment);
                },
            );
        });

        return () => {
            socketLocal.off('broadcastEmitNewComment');
            socketLocal.off('broadcastEmitDeletedComment');
            socketLocal.disconnect();
        };
    }, []);

    return (
        <ActiveComponent
            debateZone={debateZone}
            commentsList={commentsList}
            onCommentReply={onCommentReply}
            onCommentDelete={onCommentDelete}
            onCommentSend={onCommentNew}
        />
    );
};