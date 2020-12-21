import {ACTION_TYPES} from "../../Constants/Constants";

export const login = (data) => {
    return {
        type: ACTION_TYPES.LOGIN,
        payload: data
    }
};

export const logout = (data) => {
    return {
        type: ACTION_TYPES.LOGOUT
    }
};