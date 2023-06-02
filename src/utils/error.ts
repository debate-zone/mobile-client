import { log } from './logger';

export const createError = (message: string, e?: any) => {
    message = `${message}: ${e.message || e.details}`;
    log.error(message);
    return new Error(message);
};
