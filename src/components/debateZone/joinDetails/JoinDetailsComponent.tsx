import { Image, TouchableOpacity, View } from 'react-native';
import { CreatedDebateZone } from '../../../types/debateZone';
import { Text } from 'react-native-paper';
import React from 'react';
import Toast from 'react-native-root-toast';

interface JoinDetailsProps {
    debateZone?: CreatedDebateZone;
    onJoin: () => Promise<CreatedDebateZone>;
}

export const JoinDetailsComponent = ({
    debateZone,
    onJoin,
}: JoinDetailsProps) => {
    return (
        <View
            style={{
                flexDirection: 'column',
            }}
        >
            <View
                key={`card-debate-zone-details-${debateZone?._id}`}
                style={{
                    backgroundColor: '#D9D9D9',
                    padding: 30,
                    marginTop: 40,
                    borderRadius: 21,
                    margin: 20,
                    height: '70%',
                    flexDirection: 'column',
                    shadowOffset: {
                        width: 4,
                        height: 5,
                    },
                    shadowColor: 'black',
                    shadowRadius: 12,
                    shadowOpacity: 0.2,
                }}
            >
                <Image
                    source={require('../../../../assets/avatar.png')}
                    style={{
                        alignSelf: 'center',
                    }}
                />
                <View
                    style={{
                        marginTop: 30,
                        position: 'absolute',
                        bottom: 30,
                        marginLeft: 20,
                        marginRight: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            marginBottom: 20,
                        }}
                    >
                        {debateZone?.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {debateZone?.shortDescription}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    onJoin().then(debateZone => {
                        Toast.show("You've joined the debate zone!", {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    });
                }}
            >
                <View
                    style={{
                        height: 66,
                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor: '#14213D',
                        flexDirection: 'row',
                        borderRadius: 21,
                        padding: 20,
                    }}
                >
                    <Image
                        source={require('../../../../assets/logo-white.png')}
                        resizeMode={'contain'}
                        style={{ height: 39, width: 36 }}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            alignSelf: 'center',
                            marginLeft: 13,
                            color: '#FFFFFF',
                        }}
                    >
                        Join
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
