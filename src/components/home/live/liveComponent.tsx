import { Dimensions, Pressable, View } from 'react-native';
import {
    CreatedDebateZone,
    OutputComment,
    OutputCommentList,
    Round,
} from '../../../types/debateZone';
import { TimeComponent } from '../../debateZone/time/timeComponent';
import { ShortDescriptionComponent } from '../../debateZone/shortDescription/shortDescriptionComponent';
import { MediaComponent } from '../../debateZone/media/mediaComponent';
import React, { useEffect, useState } from 'react';
import { CommentListComponent } from '../../debateZone/comments/commentListComponent';
import { LiveLabelComponent } from '../../../components/home/live/liveLabel/liveLabelComponent';
import { MicrophoneLabelComponent } from '../../../components/home/live/microphone/microphoneLabelComponent';
import { VideoLabelComponent } from '../../debateZone/camera/videoLabelComponent';
import { LoveLabelComponent } from '../../../components/home/live/loveLabel/loveLabelComponent';
import { CommentsLabelComponent } from '../../debateZone/comments/commentsLabelComponent';
import { CommentSendComponent } from '../../debateZone/comments/commentSendComponent';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';

interface LiveComponentProps {
    debateZone: CreatedDebateZone;
    commentsList: OutputCommentList;
    onCommentDelete: (comment: OutputComment) => void;
    onCommentReply: (comment: OutputComment) => void;
    onCommentSend: (text: string) => void;
    localStream: any;
    remoteStreams: any[];
    userAvatar: AvatarImageSource;
}

export const LiveComponent = ({
    debateZone,
    commentsList,
    onCommentReply,
    onCommentDelete,
    onCommentSend,
    localStream,
    remoteStreams,
    userAvatar,
}: LiveComponentProps) => {
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
                <MediaComponent stream={localStream} />
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
                    <MediaComponent stream={remoteStreams[0]} />
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
