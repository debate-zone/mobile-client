import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { LiveComponent } from '../../components/home/live/liveComponent';
import { useLiveScreen } from '../../screens/liveScreen/liveScreen.hook';
import { useLiveScreenComment } from '../../screens/liveScreen/liveScreen.comment.hook';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ActiveScreen'>;
    route: any;
}

export const LiveScreen = ({ navigation, route }: RootScreenProps) => {
    const { debateZone, localStream, remoteStreams, profileImage } =
        useLiveScreen(route.params.debateZoneId);

    const { commentsList, onCommentReply, onCommentDelete, onCommentNew } =
        useLiveScreenComment(route.params.debateZoneId);

    return (
        <LiveComponent
            debateZone={debateZone}
            commentsList={commentsList}
            onCommentReply={onCommentReply}
            onCommentDelete={onCommentDelete}
            onCommentSend={onCommentNew}
            localStream={localStream}
            remoteStreams={remoteStreams}
            userAvatar={{ uri: profileImage }}
        />
    );
};
