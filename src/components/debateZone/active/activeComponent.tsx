import { Dimensions, Pressable, View } from 'react-native';
import {
    CreatedDebateZone,
    OutputComment,
    OutputCommentList,
    Round,
} from '../../../types/debateZone';
import { TimeComponent } from '../../../components/debateZone/time/timeComponent';
import { ShortDescriptionComponent } from '../../../components/debateZone/shortDescription/shortDescriptionComponent';
import { MediaComponent } from '../../../components/debateZone/media/mediaComponent';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../../utils/loginUtils';
import { CommentListComponent } from '../../../components/debateZone/comments/commentListComponent';
import { LiveLabelComponent } from '../../../components/debateZone/liveLabel/liveLabelComponent';
import { MicrophoneLabelComponent } from '../../../components/debateZone/microphone/microphoneLabelComponent';
import { VideoLabelComponent } from '../../../components/debateZone/camera/videoLabelComponent';
import { LoveLabelComponent } from '../../../components/debateZone/loveLabel/loveLabelComponent';
import { CommentsLabelComponent } from '../../../components/debateZone/comments/commentsLabelComponent';
import { CommentSendComponent } from '../../../components/debateZone/comments/commentSendComponent';

interface ActiveComponentProps {
    debateZone: CreatedDebateZone;
    commentsList: OutputCommentList;
    onCommentDelete: (comment: OutputComment) => void;
    onCommentReply: (comment: OutputComment) => void;
    onCommentSend: (text: string) => void;
}

export const ActiveComponent = ({
    debateZone,
    commentsList,
    onCommentReply,
    onCommentDelete,
    onCommentSend,
}: ActiveComponentProps) => {
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [isUserActive, setIsUserActive] = useState<boolean>(true);
    const [currentRound, setCurrentRound] = useState<Round>({
        time: 0,
        isFinished: false,
        activeUserId: '',
        _id: '',
    });
    const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(false);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
    const [comments, setComments] = useState<OutputCommentList>(undefined);
    const [isLove, setIsLove] = useState<boolean>(false);
    const [isComments, setIsComments] = useState<boolean>(false);

    useEffect(() => {
        getUser().then(user => {
            setCurrentUserId(user?._id);
            setIsUserActive(
                debateZone?.participants?.some(
                    participant => participant?.userId === currentUserId,
                ),
            );
            setCurrentRound(debateZone?.rounds?.[0]);
        });
    }, [debateZone]);

    useEffect(() => {
        setComments(commentsList);
    }, [commentsList]);

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 60,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        alignItems: 'flex-start',
                        marginLeft: 30,
                    }}
                >
                    <TimeComponent
                        time={currentRound?.time}
                        onDone={() => currentRound?.time}
                    />
                </View>

                <LiveLabelComponent
                    style={{
                        position: 'absolute',
                        top: 5,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                    isLive={true}
                />

                <View
                    style={{
                        alignItems: 'flex-end',
                        marginRight: 30,
                    }}
                >
                    <ShortDescriptionComponent
                        shortDescription={debateZone?.shortDescription}
                    />
                </View>
            </View>

            <View
                style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                }}
            >
                <MediaComponent />
            </View>

            <View
                style={{
                    flexDirection: 'column',
                    position: 'absolute',
                    right: 10,
                    bottom: Dimensions.get('window').height / 2.8,
                    zIndex: 1,
                }}
            >
                <Pressable
                    onPress={() => {
                        setIsMicrophoneOn(!isMicrophoneOn);
                    }}
                >
                    <MicrophoneLabelComponent isMicrophoneOn={isMicrophoneOn} />
                </Pressable>

                <Pressable
                    style={{
                        marginTop: 15,
                    }}
                    onPress={() => {
                        setIsVideoOn(!isVideoOn);
                    }}
                >
                    <VideoLabelComponent isVideoOn={isVideoOn} />
                </Pressable>

                <Pressable
                    style={{
                        marginTop: 15,
                    }}
                    onPress={() => {
                        setIsLove(!isLove);
                    }}
                >
                    <LoveLabelComponent isLove={isLove} />
                </Pressable>

                <Pressable
                    style={{
                        marginTop: 15,
                    }}
                    onPress={() => {
                        setIsComments(!isComments);
                    }}
                >
                    <CommentsLabelComponent isComments={isComments} />
                </Pressable>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 100,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        alignItems: 'flex-start',
                        width: Dimensions.get('window').width / 3,
                        height: Dimensions.get('window').height / 5,
                        marginLeft: 15,
                    }}
                >
                    <MediaComponent />
                </View>
                <View
                    style={{
                        alignItems: 'flex-end',
                        width: (Dimensions.get('window').width / 3) * 1.9,
                        height: Dimensions.get('window').height / 5,
                        justifyContent: 'space-between',
                        marginRight: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        <CommentListComponent
                            outputCommentList={comments}
                            onDelete={onCommentDelete}
                            onReply={onCommentReply}
                        />
                        <CommentSendComponent onSend={onCommentSend} />
                    </View>
                </View>
            </View>
        </>
    );
};
