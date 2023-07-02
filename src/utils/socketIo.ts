import { io, Socket } from 'socket.io-client';

import * as Device from 'expo-device';
import { getToken } from '../utils/loginUtils';

export const socketIo = async (
    socketUrl: string,
    debateZoneId: string,
    transports?: string[],
): Promise<Socket> => {
    const token = await getToken();

    return io(socketUrl, {
        auth: {
            token: token?.token,
        },
        query: {
            deviceName: Device.deviceName + ' ' + Device.osName,
            debateZoneId: debateZoneId,
        },
        transports: transports,
    });
};
