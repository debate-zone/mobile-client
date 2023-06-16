import { Dimensions, StyleSheet } from 'react-native';
//@ts-ignore
import VideoOn from '../../../../assets/debateZone/video/video-on.svg';
//@ts-ignore
import VideoOff from '../../../../assets/debateZone/video/video-off.svg';

interface VideoComponentProps {
    isVideoOn: boolean;
}

export const VideoLabelComponent = (props: VideoComponentProps) => {
    return (
        <>
            {props.isVideoOn ? (
                <VideoOn
                    color={styles.microphoneLabel.color}
                    width={styles.microphoneLabel.width}
                    height={styles.microphoneLabel.height}
                />
            ) : (
                <VideoOff
                    color={styles.microphoneLabel.color}
                    width={styles.microphoneLabel.width}
                    height={styles.microphoneLabel.height}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    microphoneLabel: {
        color: 'white',
        width: Dimensions.get('window').width / 11,
        height: Dimensions.get('window').width / 11,
    },
});
