import { getUser } from '../../utils/loginUtils';

export const useUsers = () => {
    const fetchLoggedUser = () => {
        return getUser();
    };

    return {
        fetchLoggedUser,
    };
};
