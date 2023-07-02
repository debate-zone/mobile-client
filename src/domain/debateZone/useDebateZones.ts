import { request } from '../../apiClient/apiClient';
import { CreatedDebateZone } from '../../types/debateZone';

export const useDebateZones = () => {
    const fetchActiveDetails = (debateZoneId: string) => {
        return request<CreatedDebateZone>(
            'GET',
            `/debate-zone/v1/debate-zones/active/details?id=${debateZoneId}`,
        );
    };

    return {
        fetchActiveDetails,
    };
};
