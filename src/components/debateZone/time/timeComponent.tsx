import { Text } from 'react-native';
import { useEffect, useState } from 'react';

interface TimeComponentProps {
    time: number;
}

export const TimeComponent = (props: TimeComponentProps) => {
    const [time, setTime] = useState(props.time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => time - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Text
            style={{
                fontSize: 20,
                color: '#ffffff',
            }}
        >
            {time}
        </Text>
    );
};
