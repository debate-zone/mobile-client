import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { request } from '../../apiClient/apiClient';
import {
    NotificationType,
    OutputNotification,
    OutputNotificationList,
} from '../../types/debateZone';
import { useEffect, useState } from 'react';
import { getUser } from '../../utils/loginUtils';
import { User } from '../../types/user';
import NotificationList from '../../components/notificationList/NotificationList';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'NotificationScreen'
    >;
}

export const NotificationScreen = ({ navigation }: RootScreenProps) => {
    const [currentUser, setCurrentUser] = useState<User>();

    const [notificationList, setNotificationList] =
        useState<OutputNotificationList>();
    const getNotificationList = async () => {
        return await request<OutputNotificationList>(
            'GET',
            '/notification/v1/notifications/list',
        );
    };

    useEffect(() => {
        getUser().then(user => {
            setCurrentUser(user);
        });
        getNotificationList().then(value => {
            setNotificationList(value);
        });
    }, []);

    const navigateOnPress = async (
        outputNotificationItem: OutputNotification,
    ) => {
        switch (outputNotificationItem.type) {
            case NotificationType.Invited:
            case NotificationType.Joined:
                await navigateDebateOnPress(outputNotificationItem);
                break;
        }
    };

    const navigateDebateOnPress = async (
        outputNotificationItem: OutputNotification,
    ) => {
        markAsReadNotification(outputNotificationItem._id);
        navigation.navigate('JoinDetailsScreen', {
            id: outputNotificationItem.entityId,
        });
    };

    const markAsReadNotification = async (id: string) => {
        try {
            await request<OutputNotification>(
                'PUT',
                '/notification/v1/notifications/read',
                { id },
            );
            setNotificationList(notificationList => {
                return {
                    ...notificationList,
                    notifications: notificationList.notifications.filter(
                        x => x._id !== id,
                    ),
                };
            });
        } catch (e) {
            console.error(`can't update notification ${id}`, e);
        }
    };

    const markAllAsRead = async () => {
        request<OutputNotificationList>(
            'PUT',
            '/notification/v1/notifications/read-all',
        ).then(value => {
            setNotificationList(value);
        });
    };

    return (
        <View style={style.container}>
            {notificationList?.notifications &&
            notificationList?.notifications.length > 0 ? (
                <TouchableOpacity
                    style={{ alignItems: 'flex-end' }}
                    onPress={markAllAsRead}
                >
                    <Text style={style.markAllRead}>Mark all as read</Text>
                </TouchableOpacity>
            ) : (
                <></>
            )}

            <NotificationList
                onPress={navigateOnPress}
                markAsReadOnPress={markAsReadNotification}
                outputNotificationList={notificationList}
            />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A9BBE2',
    },
    markAllRead: {
        padding: 15,
        color: 'white',
        fontSize: 15,
    },
});
