import { ProfileComponent } from '../../components/profile/ProfileComponent';
import { useEffect, useState } from 'react';
import { getUser } from '../../utils/loginUtils';
import { PoliticalPreference } from '@/types/user';

export const ProfileScreen = () => {
    const [currentPoliticalPreference, setCurrentPoliticalPreference] =
        useState<PoliticalPreference>();

    useEffect(() => {
        getUser().then(user => {
            setCurrentPoliticalPreference(user.politicalPreference);
        });
    }, []);

    return (
        <>
            <ProfileComponent
                politicalPreferences={[currentPoliticalPreference]}
                onPoliticalPreferenceSelected={() => {}}
            />
        </>
    );
};
