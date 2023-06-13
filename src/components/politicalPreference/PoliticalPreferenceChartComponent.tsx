import { VictoryChart, VictoryLabel, VictoryScatter } from 'victory-native';
import { PoliticalPreferenceEnum } from '../../types/user';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

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
            theme={{
                axis: {
                    style: {
                        axis: {
                            stroke: '#3f3c39',
                            strokeWidth: 1.8,
                            opacity: 1.5,
                        },
                        tickLabels: {
                            fill: 'transparent',
                        },
                        grid: {
                            stroke: '#3f3c39',
                            strokeWidth: 0.4,
                        },
                    },
                },
                scatter: {
                    style: {
                        labels: {
                            fill: '#d98607',
                            fontSize: 20,
                            borderRadius: 10,
                        },
                    },
                },
            }}
            domain={{ x: [-15, 15], y: [-15, 15] }}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height / 2}
        >
            <VictoryScatter
                data={dataPoints}
                size={10}
                labels={({ datum }) => {
                    return datum.label;
                }}
                labelComponent={<VictoryLabel />}
                events={[
                    {
                        target: 'data',
                        eventHandlers: {
                            onPressIn: () => {
                                return [
                                    {
                                        target: 'labels',
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
