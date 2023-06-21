import { ProfileComponent } from '../../components/profile/ProfileComponent';
import { useEffect, useState } from 'react';
import { getUser, removeToken, saveUser } from '../../utils/loginUtils';
import { User } from '../../types/user';
import { request } from '../../apiClient/apiClient';
import {IsReadNotification, OutputDebateZoneList} from '../../types/debateZone';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types';
import React from 'react';

interface RootScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>;
}

export const ProfileScreen = ({ navigation }: RootScreenProps) => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [joinedDebateZones, setJoinedDebateZones] =
        useState<OutputDebateZoneList>();
    const [myDebateZones, setMyDebateZones] = useState<OutputDebateZoneList>();

    const [notificationIsRead, setNotificationIsRead] = useState<boolean>(false)
    const updateName = async (fullName: string) => {
        const user = await request<User>('PUT', '/user/v1/users/update', {
            fullName: fullName,
        });
        await saveUser(user);
        setCurrentUser(user);
    };

    const logout = async () => {
        removeToken().then(r => {
            navigation.navigate('LoginScreen');
        });
    };

    const getJoinedDebateZones = async () => {
        return await request<OutputDebateZoneList>(
            'GET',
            '/debate-zone/v1/debate-zones/profile/list',
        );
    };

    const getMyDebateZones = async () => {
        return await request<OutputDebateZoneList>(
            'GET',
            '/debate-zone/v1/debate-zones/profile/my-list',
        );
    };

    const getIsReadNotification = async () => {
        return await request<IsReadNotification>(
            'GET',
            '/notification/v1/notifications/isRead'
        )
    }

    const onJoinListItemPress = (id: string) => {
        navigation.navigate('JoinDetailsScreen', {
            id,
        });
    };

    useEffect(() => {
        getUser().then(user => {
            setCurrentUser(user);
        });
        getJoinedDebateZones().then(debateZoneList => {
            setJoinedDebateZones(debateZoneList);
        });
        getMyDebateZones().then(debateZoneList => {
            setMyDebateZones(debateZoneList);
        });
        getIsReadNotification().then(value => {
            setNotificationIsRead(value.isRead)
        })
    }, []);

    return (
        <>
            <ProfileComponent
                notificationIsRead={notificationIsRead}
                user={currentUser}
                onPoliticalPreferenceSelected={() => {}}
                onChangeName={updateName}
                onLogout={logout}
                joinedDebateZones={joinedDebateZones}
                myDebateZones={myDebateZones}
                onJoinListItemPress={onJoinListItemPress}
                onCreateDebateZonePress={() => {
                    navigation.navigate('NewDebateZoneScreen');
                }}
                onJoinDebateZonePress={() => {
                    navigation.navigate('JoinListScreen');
                }}
            />
        </>
    );
};
