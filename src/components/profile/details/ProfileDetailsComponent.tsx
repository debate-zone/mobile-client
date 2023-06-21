import { Avatar, TextInput, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';
import React from 'react';
import TrueNotificationSvg from "../../../../src/components/svgIcons/truenotification";
import IsNotificationSvg from "../../../../src/components/svgIcons/truenotification";
import NotificationSvg from "../../../../src/components/svgIcons/falsenotification";
import NoNotificationSvg from "../../../../src/components/svgIcons/falsenotification";
interface ProfileDetailsComponentProps {
    imgSource?: AvatarImageSource;
    name?: string;
    email: string;
    onChangeName: (fullName: string) => void;
    onLogout: () => void;
    notificationIsRead: boolean
}

export const ProfileDetailsComponent = (
    props: ProfileDetailsComponentProps,

) => {
    const [name, setName] = useState(props.name);
    const [image] = useState<AvatarImageSource | undefined>(props.imgSource);
    const [isEditingName, setIsEditingName] = useState(false);

    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
            }}
        >
            <Avatar.Image
                style={{
                    marginRight: 20,
                }}
                size={120}
                source={props.imgSource}
            />
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: 20,
                }}
            >
                {isEditingName ? (
                    <TextInput
                        style={{
                            fontSize: 30,
                            marginBottom: 15,
                        }}
                        label="Name"
                        value={name}
                        onChangeText={text => {
                            setName(text);
                        }}
                        onBlur={() => {
                            setIsEditingName(false);
                        }}
                        onSubmitEditing={() => {
                            props.onChangeName(name);
                        }}
                    />
                ) : (
                    <Text
                        style={{ fontSize: 20, marginBottom: 15 }}
                        onPress={() => {
                            setIsEditingName(true);
                        }}
                    >
                        {name}
                    </Text>
                )}

                <Text>{props.email}</Text>
                <Button
                    style={{
                        marginTop: 20,
                        alignSelf: 'flex-end',
                    }}
                    mode="contained"
                    onPress={props.onLogout}
                >
                    Logout
                </Button>
            </View>

            {props.notificationIsRead ? <NoNotificationSvg/>  : <IsNotificationSvg/>}
        </View>
    );
};
