declare module '*module.scss';

export type RootStackParamList = {
    LoginScreen: undefined;
    PoliticalPreferenceScreen: undefined;
    HomeScreen: undefined;
    NewDebateZoneScreen: undefined;
    JoinListScreen: undefined;
    ProfileScreen: undefined;
    JoinDetailsScreen: {
        id: string;
    };
    ActiveScreen: {
        debateZoneId: string;
    };
};
