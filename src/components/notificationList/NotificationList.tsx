import React, {useEffect, useState} from "react";
import {NotificationType, OutputNotification, OutputNotificationList} from "../../types/debateZone";
import {FlatList, View, Text} from "react-native";
import NotificationItem from "../../components/notificationItem/NotificationItem";

interface NotificationListProps {
    outputNotificationList: OutputNotificationList
    onPress: (outputNotificationItem: OutputNotification) => void
    markAsReadOnPress: (id: string) => void
}


const NotificationList: React.FC<NotificationListProps> = (props) => {

    const [notificationList, setNotificationList] = useState<OutputNotificationList>()

    useEffect(() =>{
        if(props){
            setNotificationList(props.outputNotificationList)
        }
    }, [])

    return(
        props?.outputNotificationList?.notifications && props.outputNotificationList.notifications.length > 0 && (
            <View>
                <FlatList data={props.outputNotificationList.notifications} renderItem={({item}) => (
                    <NotificationItem outputNotification={item} onPressMarkAsRead={props.markAsReadOnPress} onPress={props.onPress}/>
                )}
                />
            </View>
        ) || <Text style={{textAlign: 'center', marginTop: 20, fontSize: 20}}>There are no notifications yet</Text>
    )
}

export default NotificationList