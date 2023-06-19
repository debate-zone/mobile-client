import {
    PoliticalPreference,
    PoliticalPreferenceEnum,
    User,
} from '../../types/user';
import { PoliticalPreferenceChartComponent } from '../../components/politicalPreference/PoliticalPreferenceChartComponent';
import { SafeAreaView, View } from 'react-native';
import { ProfileDetailsComponent } from '../../components/profile/details/ProfileDetailsComponent';
import { useEffect, useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import JoinList from '../../components/UI/joinList/joinList';
import { OutputDebateZoneList } from '../../types/debateZone';

interface ProfileComponentProps {
    user: User;
    onPoliticalPreferenceSelected: (
        politicalPreference: PoliticalPreferenceEnum,
    ) => void;
    onChangeName: (fullName: string) => void;
    onLogout: () => void;
    joinedDebateZones: OutputDebateZoneList;
    myDebateZones: OutputDebateZoneList;
    onJoinListItemPress: (id: string) => void;
}

type SegmentButtonValue = 'chart' | 'joinedList' | 'myDebates';

type SegmentButton = {
    value: SegmentButtonValue;
    label: string;
};

const segmentButtons: SegmentButton[] = [
    {
        value: 'chart',
        label: 'Chart',
    },
    {
        value: 'joinedList',
        label: 'Joined',
    },
    {
        value: 'myDebates',
        label: 'My Debates',
    }
];

export const ProfileComponent: React.FC<ProfileComponentProps> = ({
    user,
    onPoliticalPreferenceSelected,
    onChangeName,
    onLogout,
    joinedDebateZones,
    myDebateZones,
    onJoinListItemPress,
}) => {
    const [name, setName] = useState<string | undefined>();
    const [email, setEmail] = useState<string>();
    const [politicalPreference, setPoliticalPreference] =
        useState<PoliticalPreference>();
    const [image, setImage] = useState<string | undefined>();
    const [currentSegmentButton, setCurrentSegmentButton] = useState<
        SegmentButton[]
    >([segmentButtons.find(button => button.value === 'chart')]);

    useEffect(() => {
        if (user) {
            setName(user.firstName + ' ' + user.secondName);
            setEmail(user.email);
            setPoliticalPreference(user.politicalPreference);
            setImage(user.image);
        }
    }, [user]);

    const getTabBody = (segmentButtonValue: SegmentButtonValue) => {
        switch (segmentButtonValue) {
            case 'chart':
                return (
                    <PoliticalPreferenceChartComponent
                        politicalPreferences={[politicalPreference]}
                        onPoliticalPreferenceSelected={
                            onPoliticalPreferenceSelected
                        }
                    />
                );
            case 'joinedList':
                return <JoinList
                    outputDebateZoneList={joinedDebateZones}
                    onPress={onJoinListItemPress}
                />
            case 'myDebates':
                return (
                    <JoinList
                        outputDebateZoneList={myDebateZones}
                        onPress={onJoinListItemPress}
                    />
                );
        }
    };

    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 60,
            }}
        >
            <ProfileDetailsComponent
                imgSource={{ uri: image }}
                name={name}
                email={email}
                onChangeName={onChangeName}
                onLogout={onLogout}
            />

            <SafeAreaView
                style={{
                    marginTop: 20,
                    width: '100%',
                    height: '100%',
                }}
            >
                <SegmentedButtons
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                    }}
                    value={currentSegmentButton[0]?.value}
                    onValueChange={value => {
                        setCurrentSegmentButton([
                            segmentButtons.find(
                                button => button.value === value,
                            ),
                        ]);
                    }}
                    buttons={segmentButtons}
                />
                <View
                    style={{
                        marginTop: -10,
                    }}
                >
                    {getTabBody(currentSegmentButton[0]?.value)}
                </View>
            </SafeAreaView>
        </View>
    );
};
