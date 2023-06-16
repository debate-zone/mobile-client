import { Dimensions, Pressable, View } from 'react-native';
import {
    CreatedDebateZone,
    OutputComment,
    OutputCommentList,
    Round,
} from '../../../types/debateZone';
import { TimeComponent } from '../../../components/debateZone/time/timeComponent';
import { ShortDescriptionComponent } from '../../../components/debateZone/shortDescription/shortDescriptionComponent';
import { StreamComponent } from '../../../components/debateZone/stream/streamComponent';
import CameraComponent from '../../../components/capture/camera/CameraComponent';
import { useEffect, useState } from 'react';
import { getUser } from '../../../utils/loginUtils';
import { CommentListComponent } from '../../../components/debateZone/comments/commentListComponent';
import { LiveLabelComponent } from '../../../components/debateZone/liveLabel/liveLabelComponent';
import { MicrophoneLabelComponent } from '../../../components/debateZone/microphone/microphoneLabelComponent';
import { VideoLabelComponent } from '../../../components/debateZone/camera/videoLabelComponent';

interface ActiveComponentProps {
    debateZone: CreatedDebateZone;
    commentsList: OutputCommentList;
    onCommentDelete: (comment: OutputComment) => void;
    onCommentReply: (comment: OutputComment) => void;
}

export const ActiveComponent = ({
    debateZone,
    commentsList,
    onCommentReply,
    onCommentDelete,
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
                {isUserActive ? <CameraComponent /> : <StreamComponent />}
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
                    {!isUserActive ? <CameraComponent /> : <StreamComponent />}
                </View>
                <View
                    style={{
                        alignItems: 'flex-end',
                        width: (Dimensions.get('window').width / 3) * 1.9,
                        height: Dimensions.get('window').height / 5,
                        marginRight: 10,
                    }}
                >
                    <CommentListComponent
                        outputCommentList={commentsList}
                        onDelete={onCommentDelete}
                        onReply={onCommentReply}
                    />
                </View>
            </View>
        </>
    );
};
