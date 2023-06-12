import { log } from './logger';
import { CustomError, ErrorBody } from '../types/requestResponse';

export const createError = (
    message: string,
    messages?: ErrorBody['error']['message'],
) => {
    log.error(message);
    return new CustomError(message, messages);
};
