export type CreatedParticipant = {
    userId: string;
    role: string;
};

export type CreatedDebateZone = {
    _id: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
    title: string;
    shortDescription: string;
    type: Type;
    date: string;
    isPrivate: boolean;
    isAIReferee: boolean;
    isPublicChoice: boolean;
    participants: CreatedParticipant[];
    isSave: boolean;
};

export type NewParticipant = {
    email: string;
    role: string;
};

export type NewDebateZone = {
    title: string;
    shortDescription: string;
    roundTime: number;
    type: Type;
    date: string;
    isPrivate: boolean;
    isAIReferee: boolean;
    participants: NewParticipant[];
    isPublicChoice: boolean;
    isSave: boolean;
};

export enum Type {
    POLITICAL = 'political',
}

export enum Role {
    REFEREE = 'referee',
    VIEWER = 'viewer',
    DEBATER = 'debater',
}

export type OutputDebateZoneListItem = {
    _id: string;
    title: string;
    shortDescription: string;
};

export type OutputDebateZoneList = {
    debateZones: OutputDebateZoneListItem[];
};
