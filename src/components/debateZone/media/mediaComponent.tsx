//@ts-ignore
import Avatar from '../../../../assets/debateZone/avatar.svg';
import React, { useEffect, useState } from 'react';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';
import { RTCView } from 'react-native-webrtc';

interface MediaComponentProps {
    stream: any;
}

export const MediaComponent = (props: MediaComponentProps) => {
    const [stream, setStream] = useState<any | undefined>(undefined);
    const [imageSource, setImageSource] = useState<
        AvatarImageSource | undefined
    >(undefined);

    useEffect(() => {
        setStream(props.stream);
    }, [props.stream]);

    return (
        <>
            {stream ? (
                <RTCView
                    streamURL={stream?.toURL()}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            ) : null}
        </>
    );
};
