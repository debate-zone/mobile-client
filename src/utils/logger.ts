import { logger } from 'react-native-logs';

export const log = logger.createLogger({
    severity: 'debug',
    transport: msg => console.log(msg),
    transportOptions: {
        colors: false,
        dateFormat: 'iso',
    },
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    },
    async: false,
    asyncFunc: (msg, level) => {
        console.log(msg, level);
    },
    stringifyFunc: msg => {
        return JSON.stringify(msg);
    },
    dateFormat: 'iso',
    printLevel: true,
    printDate: true,
    enabled: true,
    enabledExtensions: [],
});
