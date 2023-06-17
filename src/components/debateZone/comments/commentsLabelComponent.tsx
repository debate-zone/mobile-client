// @ts-ignore
import CommentsOn from '../../../../assets/debateZone/comments/comments-on.svg';
// @ts-ignore
import CommentsOff from '../../../../assets/debateZone/comments/comments-off.svg';
import { Dimensions, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

interface CommentsLabelComponentProps {
    isComments: boolean;
}
export const CommentsLabelComponent = (props: CommentsLabelComponentProps) => {
    const [isComments, setIsComments] = useState<boolean>(false);

    useEffect(() => {
        setIsComments(props.isComments);
    }, [props.isComments]);

    return (
        <>
            {isComments ? (
                <CommentsOn
                    color={'#ec6803'}
                    width={styles.commentsLabel.width}
                    height={styles.commentsLabel.height}
                />
            ) : (
                <CommentsOff
                    color={'#fff'}
                    width={styles.commentsLabel.width}
                    height={styles.commentsLabel.height}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    commentsLabel: {
        width: Dimensions.get('window').width / 11,
        height: Dimensions.get('window').width / 11,
    },
});
