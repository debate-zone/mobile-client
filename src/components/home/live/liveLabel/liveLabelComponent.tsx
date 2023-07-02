import { Text } from 'react-native';
import { useEffect, useState } from 'react';

interface LiveLabelComponentProps {
    isLive: boolean | undefined;
    style?: any;
}

export const LiveLabelComponent = ({
    isLive,
    style,
}: LiveLabelComponentProps) => {
    const [color, setColor] = useState<string>('red');

    useEffect(() => {
        setInterval(() => {
            setColor(color === 'red' ? 'white' : 'red');
        }, 1000);
    }, [isLive]);

    return isLive ? <Text style={{ ...style, color: color }}>●</Text> : <></>;
};
