import React from 'react';
import { PoliticalPreference, PoliticalPreferenceEnum } from '../../types/user';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PoliticalPreferenceChartComponent } from '../../components/politicalPreference/PoliticalPreferenceChartComponent';

interface PoliticalPreferenceComponentProps {
    politicalPreferences: PoliticalPreference[];
    onPoliticalPreferenceSelected: (
        politicalPreference: PoliticalPreferenceEnum,
    ) => void;
    onPoliticalPreferenceSkipped: () => void;
}

export const PoliticalPreferenceComponent: React.FC<
    PoliticalPreferenceComponentProps
> = ({
    politicalPreferences,
    onPoliticalPreferenceSelected,
    onPoliticalPreferenceSkipped,
}) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    color: '#14213D',
                    fontSize: 20,
                    textAlign: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                }}
            >
                Select your political preference
            </Text>
            <PoliticalPreferenceChartComponent
                politicalPreferences={politicalPreferences}
                onPoliticalPreferenceSelected={onPoliticalPreferenceSelected}
            />
            <Button
                mode={'text'}
                style={{
                    position: 'absolute',
                    bottom: 100,
                    width: '100%',
                }}
                onPress={onPoliticalPreferenceSkipped}
                elevation={0}
            >
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                    }}
                >
                    <Text
                        style={{
                            color: '#14213D',
                            fontSize: 20,
                            textAlign: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                        }}
                    >
                        Skip
                    </Text>
                </View>
            </Button>
        </View>
    );
};
