import { OutputComment, OutputCommentList } from '../../types/debateZone';
import { randomUUID } from 'expo-crypto';
import Toast from 'react-native-root-toast';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useComments } from '../../domain/comment/useComments';
import { socketIo } from '../../utils/socketIo';

//@ts-ignore
import { COMMENT_SOCKET_URL } from '@env';

export const useLiveScreenComment = (debateZoneId: string) => {
    const [commentsList, setCommentsList] = useState<
        OutputCommentList | undefined
    >(undefined);
    const [isComments, setIsComments] = useState<boolean>(true);
    const [commentSocket, setCommentSocket] = useState<Socket>(undefined);

    const { fetchComments } = useComments();

    useEffect(() => {
        fetchComments(debateZoneId).then(commentsList => {
            setCommentsList(commentsList);
        });

        let socketCommentLocal: Socket | undefined;

        socketIo(COMMENT_SOCKET_URL, debateZoneId).then(thisSocket => {
            socketCommentLocal = thisSocket;
            setCommentSocket(thisSocket);
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
            socketCommentLocal.disconnect();
        };
    }, []);

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
            commentSocket.emit('onNewComment', {
                text: text,
            });
            addCommentToList({
                _id: randomUUID(),
                text: text,
                userFullName: 'You',
                userId: randomUUID(),
                debateZoneId: debateZoneId,
            });
        } catch (e) {
            Toast.show('Error while sending comment', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
            });
        }
    };

    const onCommentReply = (comment: OutputComment) => {
        // todo implement
        console.log('onCommentReply not implemented yet', comment);
    };

    const onCommentDelete = (comment: OutputComment) => {
        try {
            commentSocket.emit('onDeleteComment', {
                id: comment._id,
            });
            deleteCommentFromList(comment);
        } catch (e) {
            Toast.show('Error while deleting comment', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
            });
        }
    };

    const onCommentSwitch = () => {
        setIsComments(!isComments);
    };

    return {
        commentsList,
        isComments,
        onCommentSwitch,
        onCommentNew,
        onCommentReply,
        onCommentDelete,
    };
};
