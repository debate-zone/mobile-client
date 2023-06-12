export class CustomError extends Error {
    public messages: Message[] | undefined;

    constructor(message: string, messages?: Message[]) {
        super(message);
        this.messages = messages;
    }
}

export type ErrorBody = {
    error: Error;
    status: string;
};

export type Error = {
    message: Message[];
};

export type Message = {
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
};

export type SuccessBody<T> = {
    status: string;
    data: T;
};

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
