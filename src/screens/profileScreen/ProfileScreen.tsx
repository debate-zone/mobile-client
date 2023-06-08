import { ProfileComponent } from '../../components/profile/ProfileComponent';
import { useEffect, useState } from 'react';
import { getUser, removeToken, saveUser } from '../../utils/loginUtils';
import { User } from '../../types/user';
import { request } from '../../apiClient/apiClient';

export const ProfileScreen = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState<User>();

    const updateName = async (fullName: string) => {
        const user = await request<User>('PUT', '/users/updateUser', {
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

    useEffect(() => {
        getUser().then(user => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <>
            <ProfileComponent
                user={currentUser}
                onPoliticalPreferenceSelected={() => {}}
                onChangeName={updateName}
                onLogout={logout}
            />
        </>
    );
};
