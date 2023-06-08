import {
    PoliticalPreference,
    PoliticalPreferenceEnum,
    User,
} from '../../types/user';
import { PoliticalPreferenceChartComponent } from '../../components/politicalPreference/PoliticalPreferenceChartComponent';
import { View } from 'react-native';
import { ProfileDetailsComponent } from '../../components/profile/details/ProfileDetailsComponent';
import { useEffect, useState } from 'react';

interface ProfileComponentProps {
    user: User;
    onPoliticalPreferenceSelected: (
        politicalPreference: PoliticalPreferenceEnum,
    ) => void;
    onChangeName: (fullName: string) => void;
    onLogout: () => void;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({
    user,
    onPoliticalPreferenceSelected,
    onChangeName,
    onLogout,
}) => {
    const [name, setName] = useState<string | undefined>();
    const [email, setEmail] = useState<string>();
    const [politicalPreference, setPoliticalPreference] =
        useState<PoliticalPreference>();
    const [image, setImage] = useState<string | undefined>();

    useEffect(() => {
        if (user) {
            setName(user.firstName + ' ' + user.secondName);
            setEmail(user.email);
            setPoliticalPreference(user.politicalPreference);
            setImage(user.image);
        }
    }, [user]);

    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
            }}
        >
            <ProfileDetailsComponent
                imgSource={{ uri: image }}
                name={name}
                email={email}
                onChangeName={onChangeName}
                onLogout={onLogout}
            />

            <PoliticalPreferenceChartComponent
                politicalPreferences={[politicalPreference]}
                onPoliticalPreferenceSelected={onPoliticalPreferenceSelected}
            />
        </View>
    );
};
