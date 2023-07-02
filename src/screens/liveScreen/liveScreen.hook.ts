import { useEffect, useRef, useState } from 'react';
import { CreatedDebateZone, Role } from '../../types/debateZone';
import { socketIo } from '../../utils/socketIo';
import { Socket } from 'socket.io-client';
import * as mediaSoupClient from 'mediasoup-client';
import { useDebateZones } from '../../domain/debateZone/useDebateZones';
import { useUsers } from '../../domain/user/useUsers';
import { User } from '../../types/user';
//@ts-ignore
import { MEDIA_SOCKET_URL } from '@env';
import { registerGlobals } from 'react-native-webrtc';

export const useLiveScreen = (debateZoneId: string) => {
    const [loggedUser, setLoggedUser] = useState<User>(undefined);
    const [debateZone, setDebateZone] = useState<CreatedDebateZone>(undefined);

    const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean>(true);

    const [device, setDevice] = useState<mediaSoupClient.Device>(undefined);

    const [localStream, setLocalStream] = useState<any>(undefined);
    const [remoteStreams, setRemoteStreams] = useState<any[]>([]);

    const mediaSocket = useRef<any>(undefined);

    const { fetchLoggedUser } = useUsers();

    const { fetchActiveDetails } = useDebateZones();

    useEffect(() => {
        fetchLoggedUser().then(user => {
            setLoggedUser(user);
        });
        fetchActiveDetails(debateZoneId).then(debateZone => {
            setDebateZone(debateZone);
        });
    }, []);

    useEffect(() => {
        let socket: Socket;

        listenSocket().then(thisSocket => {
            socket = thisSocket;
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const listenSocket = async () => {
        const socket = await socketIo(MEDIA_SOCKET_URL, debateZoneId, [
            'websocket',
        ]);

        socket['request'] = socketPromise(socket);

        mediaSocket.current = socket;

        socket.on('connect', async () => {
            const data = await socket['request']('getRouterRtpCapabilities');
            await loadDevice(data);
            await loadStreams();
        });

        return socket;
    };

    const onCameraSwitch = () => {
        console.log('onCameraSwitch not implemented yet');
    };

    const onMicrophoneSwitch = () => {
        console.log('onMicrophoneSwitch not implemented yet');
    };

    const loadStreams = async () => {
        if (is(Role.DEBATER) || is(Role.REFEREE)) {
            await createProducer();
            await createConsumer();
        } else if (is(Role.VIEWER)) {
            await createConsumer();
        }
    };

    const is = (role: Role) => {
        console.log('debateZone participants', debateZone.participants);
        return (
            debateZone.participants?.some(participant => {
                return (
                    participant.userId === loggedUser._id &&
                    participant.role === role
                );
            }) ?? false
        );
    };

    const loadDevice = async routerRtpCapabilities => {
        let device: mediaSoupClient.types.Device;
        try {
            registerGlobals();
            device = new mediaSoupClient.Device();
            setDevice(device);
        } catch (error) {
            if (error.name === 'UnsupportedError') {
                console.error('device not supported');
            }
        }

        try {
            await device.load({ routerRtpCapabilities });
        } catch (error) {
            console.error(error);
        }
    };

    const createProducer = async () => {
        let stream: any;

        let data;
        try {
            data = await mediaSocket.current.request(
                'createProducerTransport',
                {
                    forceTcp: false,
                    rtpCapabilities: device.rtpCapabilities,
                },
            );
        } catch (err) {
            if (data.error) {
                console.error('error on create producer', data.error);
                return;
            }
        }

        const transport = device.createSendTransport(data);

        transport.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
                mediaSocket.current
                    .request('connectProducerTransport', {
                        dtlsParameters,
                    })
                    .then(callback)
                    .catch(errback);
            },
        );

        transport.on(
            'produce',
            async ({ kind, rtpParameters }, callback, errback) => {
                try {
                    const { id } = await mediaSocket.current.request(
                        'produce',
                        {
                            transportId: transport.id,
                            kind,
                            rtpParameters,
                        },
                    );
                    callback({ id });
                } catch (err) {
                    errback(err);
                }
            },
        );

        transport.on('connectionstatechange', state => {
            switch (state) {
                case 'connecting':
                    console.log('publishing...');
                    break;

                case 'connected':
                    setLocalStream(stream);
                    console.log('published');
                    break;

                case 'failed':
                    transport.close();
                    break;

                case 'disconnected':
                    console.log('disconnected');
                    transport.close();
                    break;

                case 'closed':
                    console.log('closed');
                    transport.close();
                    break;

                case 'new':
                    console.log('new');
                    break;

                default:
                    break;
            }
        });

        try {
            stream = await getUserMedia();

            const track = stream.getVideoTracks()[0];
            const params = { track };
            await transport.produce(params);
        } catch (err) {
            console.error('getUserMedia() failed:', err.message, err.name);
        }
    };

    const getUserMedia = async (): Promise<MediaStream> => {
        if (!device.canProduce('video')) {
            console.error('cannot produce video');
            return;
        }

        let stream;

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: isMicrophoneOn,
                video: isCameraOn,
            });
        } catch (err) {
            console.error('getUserMedia() failed:', err.message, err.name);
            throw err;
        }

        return stream;
    };

    const createConsumer = async () => {
        let stream: MediaStream;
        const data = await mediaSocket.current.request(
            'createConsumerTransport',
            {
                forceTcp: false,
            },
        );

        if (data.error) {
            console.error(data.error);
            return;
        }

        const transport = device.createRecvTransport(data);

        transport.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
                mediaSocket.current
                    .request('connectConsumerTransport', {
                        transportId: transport.id,
                        dtlsParameters,
                    })
                    .then(callback)
                    .catch(errback);
            },
        );

        transport.on('connectionstatechange', async state => {
            switch (state) {
                case 'connecting':
                    break;

                case 'connected':
                    setRemoteStreams([...remoteStreams, stream]);
                    await mediaSocket.current.request('resume');
                    break;

                case 'failed':
                    transport.close();
                    break;

                default:
                    break;
            }
        });

        stream = await consume(transport);
    };

    const consume = async (transport: mediaSoupClient.types.Transport) => {
        const { rtpCapabilities } = device;

        const data = await mediaSocket.current.request('consume', {
            rtpCapabilities,
        });

        const { producerId, id, kind, rtpParameters } = data;

        const consumer = await transport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
        });

        const stream = new MediaStream();
        stream.addTrack(consumer.track);

        return stream;
    };

    const socketPromise = socket => {
        return function request(type, data = {}) {
            return new Promise(resolve => {
                socket.emit(type, data, resolve);
            });
        };
    };

    return {
        debateZone,
        localStream,
        remoteStreams,
        profileImage: loggedUser?.image,
    };
};
