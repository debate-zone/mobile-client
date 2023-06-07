import { PoliticalPreferenceEnum } from '../../types/user';
import { PoliticalPreferenceChartComponent } from '../../components/politicalPreference/PoliticalPreferenceChartComponent';
import { View } from 'react-native';

interface PoliticalPreferenceChartComponentProps {
    politicalPreferences: any[];
    onPoliticalPreferenceSelected: (
        politicalPreference: PoliticalPreferenceEnum,
    ) => void;
}

export const ProfileComponent: React.FC<
    PoliticalPreferenceChartComponentProps
> = ({ politicalPreferences, onPoliticalPreferenceSelected }) => {
    return (
        <View>
            <PoliticalPreferenceChartComponent
                politicalPreferences={politicalPreferences}
                onPoliticalPreferenceSelected={onPoliticalPreferenceSelected}
            />
        </View>
    );
};
