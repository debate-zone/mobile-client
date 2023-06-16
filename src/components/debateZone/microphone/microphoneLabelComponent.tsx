import { Dimensions, StyleSheet } from 'react-native';
//@ts-ignore
import MicrophoneOn from './../../../../assets/debateZone/microphone/microphone-on.svg';
//@ts-ignore
import MicrophoneOff from './../../../../assets/debateZone/microphone/microphone-off.svg';

interface MicrophoneComponentProps {
    isMicrophoneOn: boolean;
}

export const MicrophoneLabelComponent = (props: MicrophoneComponentProps) => {
    return (
        <>
            {props.isMicrophoneOn ? (
                <MicrophoneOn
                    color={styles.microphoneLabel.color}
                    width={styles.microphoneLabel.width}
                    height={styles.microphoneLabel.height}
                />
            ) : (
                <MicrophoneOff
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
