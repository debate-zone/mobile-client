export type User = {
    _id: string;
    image?: string;
    firstName?: string;
    secondName?: string;
    email: string;
    politicalPreference?: PoliticalPreference;
};

export type PoliticalPreference = {
    code: PoliticalPreferenceEnum;
    x: number;
    y: number;
};

export enum PoliticalPreferenceEnum {
    PRO_EUROPEAN_INTEGRATION = 'pro_european_integration',
    PRO_RUSSIAN_ORIENTATION = 'pro_russian_orientation',
    PRO_NATO_ORIENTATION = 'pro_nato_orientation',
    PRO_USA_ORIENTATION = 'pro_usa_orientation',
    PRO_CHINA_ORIENTATION = 'pro_china_orientation',
    PRO_UCRANIAN_ORIENTATION = 'pro_ucranian_orientation',
    PRO_TRANSNISTRIAN_ORIENTATION = 'pro_transnistrian_orientation',
    SOCIAL_DEMOCRAT = 'social_democrat',
    CONSERVATIVE = 'conservative',
    LIBERAL = 'liberal',
    LIBERAL_DEMOCRAT = 'liberal_democrat',
    SOCIALIST = 'socialist',
    COMMUNIST = 'communist',
    AGRARIAN = 'agrarian',
    GREEN = 'green',
    INDEPENDENT = 'independent',
    NON_PARTISAN = 'non_partisan',
    REGIONAL = 'regional',
}
