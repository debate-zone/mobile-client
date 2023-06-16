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

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ActiveScreen'>;
    route: any;
}

export const ActiveScreen = ({ navigation, route }: RootScreenProps) => {
    const [debateZone, setDebateZone] = useState<CreatedDebateZone>(undefined);
    const [commentsList, setCommentsList] =
        useState<OutputCommentList>(undefined);

    const getDebateZoneById = () => {
        return request<CreatedDebateZone>(
            'GET',
            `/debate-zone/v1/debate-zones/active/details?id=${route.params.debateZoneId}`,
        );
    };

    const getCommentsList = () => {
        console.log('getCommentsList');
        return request<OutputCommentList>(
            'GET',
            `/comment/v1/comments/list/?debateZoneId=${route.params.debateZoneId}`,
        );
    };

    const onCommentReply = (comment: OutputComment) => {
        console.log('onCommentReply', comment);
    };

    const onCommentDelete = (comment: OutputComment) => {
        console.log('onCommentDelete', comment);
    };

    useEffect(() => {
        getDebateZoneById().then(debateZone => {
            setDebateZone(debateZone);
        });
        getCommentsList().then(commentsList => {
            setCommentsList(commentsList);
        });
    }, [route.params.debateZoneId]);

    return (
        <ActiveComponent
            debateZone={debateZone}
            commentsList={commentsList}
            onCommentReply={onCommentReply}
            onCommentDelete={onCommentDelete}
        />
    );
};
