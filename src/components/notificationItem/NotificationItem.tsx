import {NotificationType, OutputNotification} from "../../types/debateZone";
import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";


interface  NotificationItemProps {
    outputNotification: OutputNotification,
    onPressMarkAsRead: (id: string) => void
    onPress: (outputNotification: OutputNotification) => void
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {

    const [outputNotification, setOutputNotification] = useState<OutputNotification>()
    const [text, setText] = useState<string>('')

    useEffect(() => {
        if(props){
            setOutputNotification(props.outputNotification)
            setText(createText(props.outputNotification))
        }
    },[])

    const createText = (outputNotification: OutputNotification) => {
        let text = ''
        switch (outputNotification.type) {
            case NotificationType.Invited:
                text = `User ${outputNotification.data.producerFullName} invited you to debate ${outputNotification.data.debateZoneTitle}.`
                break
            case NotificationType.Joined:
                text = `User ${outputNotification.data.producerFullName} joined the debate.`
                break
            case NotificationType.Left:
                text = `User ${outputNotification.data.producerFullName} left the debate.`
                break
            default:
                break
        }
        return text
    }

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => props.onPress(outputNotification)}>
                <Text>
                    {text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onPressMarkAsRead(outputNotification._id)}>
                <Text>Mark as read</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.9,
        height: 66,
        alignSelf: 'center',
        margin: 8,
        padding: 10,
        borderWidth: 1,
        borderRadius: 21,
        backgroundColor: 'white',
        borderColor: 'gray',
        shadowOffset: {
            width: 4,
            height: 5,
        },
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOpacity: 0.2
    }
})
export default NotificationItem