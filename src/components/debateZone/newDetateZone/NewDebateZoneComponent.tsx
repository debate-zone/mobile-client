import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
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
import Toast from 'react-native-root-toast';
import { CustomError } from '../../../types/requestResponse';
import moment from 'moment';
import { get, save } from '../../../store/secure/secureStoreService';
import { KeyEnum } from '../../../store/secure/keyEnum';

interface NewDebateZoneComponentProps {
    onSubmit: (newDebateZone: NewDebateZone) => Promise<string>;
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
        value: '',
        list: typeList,
        selectedList: [],
        error: '',
    });
    const [roundTime, setRoundTime] = useState<number>();
    const [date, setDate] = useState<Date>(moment().toDate());
    const [hours, setHours] = useState<number>(new Date().getHours());
    const [minutes, setMinutes] = useState<number>(new Date().getMinutes());
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
        return onSubmit(formatNewDebateZone());
    };

    const formatNewDebateZone = () => {
        date.setHours(hours || 0);
        date.setMinutes(minutes || 0);

        return {
            title: title,
            shortDescription: shortDescription,
            type: type.selectedList[0]?._id,
            roundTime: roundTime,
            date: date.toString(),
            isPrivate: isPrivate,
            isAIReferee: isAIReferee,
            participants: participants.map(participant => {
                return {
                    email: participant.email.trim().toLowerCase(),
                    role: participant.role,
                };
            }),
            isPublicChoice: isPublicChoice,
            isSave: isSave,
        };
    };

    const handleSaveUnSubmittedData = async () => {
        await save(
            KeyEnum.newDebateZone,
            JSON.stringify(formatNewDebateZone()),
        );
    };

    const handleLoadUnSubmittedData = async () => {
        get(KeyEnum.newDebateZone).then((data: string) => {
            if (data) {
                const newDebateZone = JSON.parse(data) as NewDebateZone;
                if (newDebateZone) {
                    setTitle(newDebateZone.title);
                    setShortDescription(newDebateZone.shortDescription);
                    setType({
                        ...type,
                        selectedList: typeList.filter(
                            type => type._id === newDebateZone.type,
                        ),
                    });
                    setRoundTime(newDebateZone.roundTime);
                    setDate(new Date(newDebateZone.date));
                    setIsPrivate(newDebateZone.isPrivate);
                    setIsAIReferee(newDebateZone.isAIReferee);
                    setParticipants(newDebateZone.participants);
                    setIsPublicChoice(newDebateZone.isPublicChoice);
                    setIsSave(newDebateZone.isSave);
                }
            }
        });
    };

    const clearForm = () => {
        setTitle('');
        setShortDescription('');
        setType({
            ...type,
            value: '',
            selectedList: [],
        });
        setRoundTime(0);
        setDate(undefined);
        setIsPrivate(false);
        setIsPublicChoice(false);
        setIsAIReferee(false);
        setIsSave(false);
        setParticipants([]);
        setNewParticipantEmail('');
        setNewParticipantRole({
            ...newParticipantRole,
            value: '',
            selectedList: [],
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

    useEffect(() => {
        handleLoadUnSubmittedData()
            .then(() => {
                console.log(
                    'NewDebateZoneComponent: handleLoadUnSubmittedData',
                );
            })
            .catch((error: CustomError) => {
                console.log(
                    'NewDebateZoneComponent: handleLoadUnSubmittedData: error: ',
                    error,
                );
            });
        return () => {
            handleSaveUnSubmittedData()
                .then(() => {
                    console.log(
                        'NewDebateZoneComponent: handleSaveUnSubmittedData',
                    );
                })
                .catch((error: CustomError) => {
                    console.log(
                        'NewDebateZoneComponent: handleSaveUnSubmittedData: error: ',
                        error,
                    );
                });
        };
    }, []);

    return (
        <ScrollView
            style={{
                flex: 1,
                width: '100%',
                marginTop: 30,
            }}
        >
            <View
                key="newDebateZoneForm"
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
                            key="title"
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
                            key="shortDescription"
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
                            key="type"
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
                            key="date"
                            startYear={new Date().getFullYear()}
                            endYear={new Date().getFullYear() + 1}
                            value={date}
                            onChange={(date: Date) => {
                                setDate(date);
                            }}
                            placeholder="Date*"
                            style={{
                                width: '100%',
                                height: 50,
                                marginBottom: 10,
                            }}
                            inputMode={'start'}
                            locale="en"
                        />
                        <TimePicker
                            key="time"
                            onChange={time => {
                                if (
                                    !time &&
                                    time.hours === 0 &&
                                    time.minutes === 0
                                ) {
                                    return;
                                }
                                if (time.minutes !== 0) {
                                    setMinutes(time.minutes);
                                }
                                if (time.hours !== 0) {
                                    setHours(time.hours);
                                }
                            }}
                            locale={'en'}
                            inputType={'keyboard'}
                            focused={'hours'}
                            onFocusInput={function (type: PossibleClockTypes) {
                                return;
                            }}
                            hours={hours}
                            minutes={minutes}
                            use24HourClock={true}
                        />

                        <TextInput
                            key="roundTime"
                            style={{
                                width: '100%',
                                height: 50,
                                marginBottom: 10,
                                fontSize: 20,
                            }}
                            placeholder="Round time (in minutes)*"
                            value={roundTime ? roundTime.toString() : undefined}
                            keyboardType="numeric"
                            maxLength={2}
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
                            key="isPrivate"
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
                            key="isPublicChoice"
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
                            key="isAIReferee"
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
                            key="isSave"
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
                        key="participants"
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
                                        onPress={() => {
                                            setNewParticipantEmail(
                                                participant.email,
                                            );
                                            setParticipants(
                                                participants.filter(
                                                    (p, i) => i !== index,
                                                ),
                                            );
                                        }}
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
                            handleSubmit()
                                .then(() => clearForm())
                                .catch((error: CustomError) => {
                                    Toast.show(error.message, {
                                        duration: 2000,
                                        position: Toast.positions.CENTER,
                                        textStyle: {
                                            fontSize: 20,
                                            color: 'red',
                                        },
                                    });
                                    // todo handle error
                                    console.log(error.messages);
                                });
                        }}
                    >
                        Create
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};
