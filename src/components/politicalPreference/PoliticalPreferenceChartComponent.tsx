import { VictoryChart, VictoryLabel, VictoryScatter } from 'victory-native';
import { PoliticalPreferenceEnum } from '../../types/user';
import React, { useEffect, useState } from 'react';

interface PoliticalPreferenceChartComponentProps {
    politicalPreferences: any[];
    onPoliticalPreferenceSelected: (
        politicalPreference: PoliticalPreferenceEnum,
    ) => void;
}

export const PoliticalPreferenceChartComponent: React.FC<
    PoliticalPreferenceChartComponentProps
> = ({ politicalPreferences, onPoliticalPreferenceSelected }) => {
    const [dataPoints, setDataPoints] = useState<any[]>([]);

    useEffect(() => {
        if (
            politicalPreferences &&
            politicalPreferences.length > 0 &&
            politicalPreferences[0]
        ) {
            setDataPoints(
                politicalPreferences.map(politicalPreference => {
                    return {
                        x: politicalPreference.x,
                        y: politicalPreference.y,
                        label: politicalPreference.code,
                    };
                }),
            );
        } else {
            setDataPoints([]);
        }
    }, [politicalPreferences]);

    return (
        <VictoryChart
            domain={{ x: [-10, 10], y: [-10, 10] }}
            width={400}
            height={400}
        >
            <VictoryScatter
                data={dataPoints}
                labels={({ datum }) => {
                    return datum.label;
                }}
                labelComponent={
                    <VictoryLabel
                        backgroundStyle={{
                            fill: '#FCA311',
                            fillOpacity: 0.5,
                        }}
                    />
                }
                events={[
                    {
                        target: 'data',
                        eventHandlers: {
                            onPressIn: () => {
                                return [
                                    {
                                        target: 'data',
                                        mutation: ({
                                            datum,
                                        }: {
                                            datum: any;
                                        }) => {
                                            onPoliticalPreferenceSelected(
                                                datum.label as PoliticalPreferenceEnum,
                                            );
                                        },
                                    },
                                ];
                            },
                        },
                    },
                ]}
            />
        </VictoryChart>
    );
};
