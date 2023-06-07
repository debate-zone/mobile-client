import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import {
    NewDebateZone,
    NewParticipant,
    Role,
    Type,
} from '../../../types/debateZone';
import { PaperSelect } from 'react-native-paper-select';
import { List, Button } from 'react-native-paper';
import { DatePickerInput, TimePicker } from 'react-native-paper-dates';
import { PossibleClockTypes } from 'react-native-paper-dates/lib/typescript/Time/timeUtils';

interface NewDebateZoneComponentProps {
    onSubmit: (newDebateZone: NewDebateZone) => void;
}

export const NewDebateZoneComponent: React.FC<NewDebateZoneComponentProps> = ({
    onSubmit,
}) => {
    const roleList = Object.values(Role).map((role, index) => {
        return {
            _id: role,
            value:
                role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' '),
        };
    });

    const typeList = Object.values(Type).map((type, index) => {
        return {
            _id: type,
            value:
                type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
        };
    });

    const [title, setTitle] = useState<string>();
    const [shortDescription, setShortDescription] = useState<string>();
    const [type, setType] = useState({
        value: Type.POLITICAL,
        list: typeList,
        selectedList: [],
        error: '',
    });
    const [roundTime, setRoundTime] = useState<number>();
    const [date, setDate] = useState<Date>();
    const [isPrivate, setIsPrivate] = useState<boolean>();
    const [isAIReferee, setIsAIReferee] = useState<boolean>();
    const [newParticipantEmail, setNewParticipantEmail] = useState<string>();
    const [newParticipantRole, setNewParticipantRole] = useState({
        value: '',
        list: roleList,
        selectedList: [],
        error: '',
    });
    const [participants, setParticipants] = useState<NewParticipant[]>([]);
    const [expandedParticipants, setExpandedParticipants] = useState(false);
    const [isPublicChoice, setIsPublicChoice] = useState<boolean>();
    const [isSave, setIsSave] = useState<boolean>();

    const handleSubmit = () => {
        onSubmit({
            title: title,
            shortDescription: shortDescription,
            type: type.selectedList[0]._id,
            roundTime: roundTime,
            date: date.toISOString(),
            isPrivate: isPrivate,
            isAIReferee: isAIReferee,
            participants: participants,
            isPublicChoice: isPublicChoice,
            isSave: isSave,
        });
    };

    const isReadyToAddParticipant = () => {
        return (
            newParticipantEmail &&
            newParticipantRole.selectedList &&
            newParticipantRole.selectedList.length === 1 &&
            newParticipantRole.selectedList[0]._id
        );
    };

    const handleAddParticipant = () => {
        setParticipants([
            ...participants,
            {
                email: newParticipantEmail,
                role: newParticipantRole.selectedList[0]._id,
            },
        ]);
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                width: '100%',
            }}
        >
            <View
                style={{
                    flex: 1,
                    margin: 20,
                }}
            >
                <View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                        }}
                    >
                        <TextInput
                            style={{
                                fontSize: 25,
                                width: '100%',
                                height: 50,
                                marginBottom: 10,
                            }}
                            placeholder="Title*"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={{
                                width: '100%',
                                height: 50,
                                marginBottom: 10,
                                fontSize: 15,
                            }}
                            placeholder="Short description*"
                            value={shortDescription}
                            onChangeText={setShortDescription}
                            multiline={true}
                        />

                        <PaperSelect
                            value={type.value}
                            arrayList={type.list}
                            label={'Type*'}
                            multiEnable={false}
                            onSelection={(value: any) => {
                                setType({
                                    ...type,
                                    value: value.text,
                                    selectedList: value.selectedList,
                                });
                            }}
                            selectedArrayList={type.selectedList}
                            errorText={type.error}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <DatePickerInput
                            value={date}
                            onChange={(date: Date) => setDate(date)}
                            placeholder="Date*"
                            style={{
                                width: '100%',
                                height: 50,
                                marginBottom: 10,
                            }}
                            inputMode={'start'}
                            locale={'en'}
                        />
                        <TimePicker
                            onChange={time => {
                                const dateTime = date ? date : new Date();
                                dateTime.setHours(time.hours);
                                dateTime.setMinutes(time.minutes);

                                setDate(dateTime);
                            }}
                            locale={'en'}
                            inputType={'keyboard'}
                            focused={'hours'}
                            hours={new Date().getHours() + 1}
                            minutes={new Date().getMinutes()}
                            onFocusInput={function (type: PossibleClockTypes) {
                                return;
                            }}
                        />

                        <TextInput
                            style={{
                                width: '100%',
                                height: 50,
                                marginBottom: 10,
                                fontSize: 20,
                            }}
                            placeholder="Round time (in minutes)*"
                            value={
                                roundTime
                                    ? `Round time (in minutes): ${roundTime.toString()}`
                                    : ''
                            }
                            keyboardType="numeric"
                            onChangeText={(text: string) => {
                                if (parseInt(text) < 0) {
                                    return;
                                }
                                setRoundTime(parseInt(text));
                            }}
                        />
                    </View>

                    <View
                        style={{
                            gap: 10,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <CheckBox
                                value={isPrivate}
                                onValueChange={() => setIsPrivate(!isPrivate)}
                                color={isPrivate ? '#14213D' : undefined}
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >
                                Private debate
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <CheckBox
                                value={isPublicChoice}
                                onValueChange={() =>
                                    setIsPublicChoice(!isPublicChoice)
                                }
                                color={isPublicChoice ? '#14213D' : undefined}
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >
                                Public choice
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <CheckBox
                                value={isAIReferee}
                                onValueChange={() =>
                                    setIsAIReferee(!isAIReferee)
                                }
                                color={isAIReferee ? '#14213D' : undefined}
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >
                                AI referee
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <CheckBox
                                value={isSave}
                                onValueChange={() => setIsSave(!isSave)}
                                color={isSave ? '#14213D' : undefined}
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >
                                Save record
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            marginTop: 15,
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <List.Section>
                            <List.Accordion
                                title="Participants"
                                expanded={expandedParticipants}
                                onPress={() =>
                                    setExpandedParticipants(
                                        !expandedParticipants,
                                    )
                                }
                                left={props => (
                                    <List.Icon {...props} icon="equal" />
                                )}
                            >
                                {participants.length === 0 && (
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#9a9a9a',
                                            marginBottom: 10,
                                            marginTop: 10,
                                        }}
                                    >
                                        No participants
                                    </Text>
                                )}
                                {participants.map((participant, index) => (
                                    <List.Item
                                        key={index}
                                        title={`${participant.email} | ${participant.role}`}
                                    />
                                ))}

                                <View
                                    key={'add-participant'}
                                    style={{
                                        marginTop: 10,
                                        gap: 10,
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#14213D',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Add new participant:
                                    </Text>
                                    <TextInput
                                        style={{
                                            width: '100%',
                                            height: 50,
                                            marginBottom: 10,
                                            fontSize: 20,
                                        }}
                                        placeholder="email*"
                                        textContentType={'emailAddress'}
                                        value={newParticipantEmail}
                                        onChangeText={setNewParticipantEmail}
                                        keyboardType="email-address"
                                    />

                                    <PaperSelect
                                        value={newParticipantRole.value}
                                        arrayList={newParticipantRole.list}
                                        label={'Role*'}
                                        multiEnable={false}
                                        onSelection={(value: any) => {
                                            setNewParticipantRole({
                                                ...newParticipantRole,
                                                value: value.text,
                                                selectedList:
                                                    value.selectedList,
                                                error: '',
                                            });
                                        }}
                                        selectedArrayList={
                                            newParticipantRole.selectedList
                                        }
                                        errorText={newParticipantRole.error}
                                    />

                                    <Button
                                        icon={'account-plus'}
                                        mode={'contained'}
                                        disabled={!isReadyToAddParticipant()}
                                        onPress={() => {
                                            if (!isReadyToAddParticipant) {
                                                return;
                                            }
                                            handleAddParticipant();

                                            setNewParticipantEmail('');
                                            setNewParticipantRole({
                                                ...newParticipantRole,
                                                value: '',
                                                selectedList: [],
                                            });
                                        }}
                                    >
                                        Add
                                    </Button>
                                </View>
                            </List.Accordion>
                        </List.Section>
                    </View>

                    <Button
                        style={{
                            marginTop: 10,
                            marginBottom: 70,
                        }}
                        icon={'check'}
                        mode={'contained'}
                        onPress={() => {
                            handleSubmit();
                        }}
                    >
                        Create
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};
