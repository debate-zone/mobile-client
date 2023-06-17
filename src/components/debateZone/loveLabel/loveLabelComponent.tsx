import { useEffect, useState } from 'react';
// @ts-ignore
import Love from '../../../../assets/debateZone/love/love.svg';
import { Dimensions } from 'react-native';

interface LoveLabelComponentProps {
    isLove: boolean | undefined;
}

export const LoveLabelComponent = (props: LoveLabelComponentProps) => {
    const [isLove, setIsLove] = useState<boolean>(false);

    useEffect(() => {
        setIsLove(props.isLove);
    }, [props.isLove]);

    return (
        <Love
            width={Dimensions.get('window').width / 11}
            height={Dimensions.get('window').width / 11}
            color={isLove ? '#ec6803' : '#fff'}
        />
    );
};
