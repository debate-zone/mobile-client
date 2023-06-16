import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

interface TimeComponentProps {
    time: number;
    onDone: () => number;
}

export const TimeComponent = (props: TimeComponentProps) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(props?.time);

    useEffect(() => {
        setSeconds(0);
        setMinutes(props?.time);
    }, [props?.time]);

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            return;
        }

        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    return 59;
                } else if (prevSeconds === 1 && minutes === 0) {
                    const minutes = props.onDone();
                    setMinutes(minutes);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, seconds]);

    return (
        <View>
            <Text
                style={{
                    fontSize: 32,
                    color: '#FFFFFF',
                }}
            >{`${minutes?.toString().padStart(2, '0')}:${seconds
                ?.toString()
                .padStart(2, '0')}`}</Text>
        </View>
    );
};
