import { OutputComment, OutputCommentList } from '../../../types/debateZone';
import { FlatList, View, Text } from 'react-native';
import { CommentItemComponent } from '../../../components/debateZone/comments/commentItemComponent/commentItemComponent';

interface CommentListComponentProps {
    outputCommentList: OutputCommentList;
    onReply: (comment: OutputComment) => void;
    onDelete: (comment: OutputComment) => void;
}

export const CommentListComponent = ({
    outputCommentList,
    onReply,
    onDelete,
}: CommentListComponentProps) => {
    return (
        (outputCommentList &&
            outputCommentList.comments &&
            outputCommentList.comments.length > 0 && (
                <FlatList
                    data={outputCommentList.comments}
                    renderItem={({ item }) => (
                        <CommentItemComponent
                            comment={item}
                            key={item._id}
                            onReply={onReply}
                            onDelete={onDelete}
                        />
                    )}
                    keyExtractor={item => item._id.toString()}
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                        autoscrollToTopThreshold: 0,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            )) || (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                    }}
                >
                    No comments yet
                </Text>
            </View>
        )
    );
};
