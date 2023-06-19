import { TouchableOpacity, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
//@ts-ignore
import Send from '../../../../assets/debateZone/comments/send/send.svg';
interface CommentSendComponentProps {
    onSend: (text: string) => void;
}

export const CommentSendComponent = ({ onSend }: CommentSendComponentProps) => {
    const [text, setText] = useState<string>('');

    return (
        <View
            style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                justifyContent: 'space-between',
            }}
        >
            <TextInput
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                }}
                onChangeText={text => setText(text)}
                value={text}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                }}
                onPress={() => {
                    onSend(text);
                    setText('');
                }}
            >
                <Send
                    color="black"
                    width={20}
                    height={20}
                />
            </TouchableOpacity>
        </View>
    );
};
