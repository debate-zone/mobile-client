import { request } from '../../apiClient/apiClient';
import { OutputCommentList } from '../../types/debateZone';

export const useComments = () => {
    const fetchComments = (debateZoneId: string) => {
        return request<OutputCommentList>(
            'GET',
            `/comment/v1/comments/list/?debateZoneId=${debateZoneId}`,
        );
    };

    return {
        fetchComments,
    };
};
