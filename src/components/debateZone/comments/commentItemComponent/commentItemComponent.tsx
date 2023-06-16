import { OutputComment } from '../../../../types/debateZone';
import { View, Text, Button } from 'react-native';

export const CommentItemComponent = ({
    comment,
    onReply,
    onDelete,
}: {
    comment: OutputComment;
    onReply: (comment: OutputComment) => void;
    onDelete: (comment: OutputComment) => void;
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.55)',
                padding: 10,
                margin: 10,
                height: 90,
            }}
        >
            <Text
                style={{
                    fontSize: 13,
                    color: 'white',
                }}
            >
                {comment.userFirstName}: {comment.text}
            </Text>
            <View
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 45,
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Button title="Reply" onPress={() => onReply(comment)} />
                <Button title="Delete" onPress={() => onDelete(comment)} />
            </View>
        </View>
    );
};
