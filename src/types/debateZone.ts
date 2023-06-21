export type CreatedParticipant = {
    userId: string;
    role: string;
};

export type Round = {
    time: number;
    activeUserId: string;
    isFinished: boolean;
    _id: string;
};

export type CreatedDebateZone = {
    _id: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
    title: string;
    rounds: Round[];
    shortDescription: string;
    type: Type;
    date: Date;
    isPrivate: boolean;
    isAIReferee: boolean;
    isPublicChoice: boolean;
    participants: CreatedParticipant[];
    isSave: boolean;
    isTimeExpired: boolean;
    isAlreadyJoined: boolean;
    isAlreadyFinished: boolean;
    isLive: boolean;
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
    date: Date;
    isPrivate: boolean;
    isLive: boolean;
};

export type OutputDebateZoneList = {
    debateZones: OutputDebateZoneListItem[];
};

export type Comment = {
    _id: string;
    debateZoneId: string;
    userId: string;
    userFullName: string;
    toUserId?: string;
    toUserFullName?: string;
    text: string;
    createdAt?: string;
    updatedAt?: string;
};

export type OutputComment = Comment;

export type NewComment = Omit<
    Comment,
    | '_id'
    | 'createdAt'
    | 'updatedAt'
    | 'userId'
    | 'debateZoneId'
    | 'userFullName'
>;

export type DeletedComment = Comment & {
    isDeleted: boolean;
};

export type OutputCommentList = {
    comments: OutputComment[];
};

export type IsReadNotification = {
    isRead: boolean
}