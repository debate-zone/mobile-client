import { io, Socket } from 'socket.io-client';
import {
    COMMENT_SOCKET_URL,
    // @ts-ignore
} from '@env';
import * as Device from 'expo-device';
import { getUser } from '../utils/loginUtils';

export const socketIo = async (debateZoneId: string): Promise<Socket> => {
    const loggedUser = await getUser();

    const socket = io(COMMENT_SOCKET_URL, {
        query: {
            deviceName: Device.deviceName + ' ' + Device.osName,
            userId: loggedUser._id,
            userFullName: loggedUser.firstName + ' ' + loggedUser.secondName,
            debateZoneId: debateZoneId,
        },
    });

    return socket;
};
