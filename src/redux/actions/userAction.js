import {ACTION_TYPES} from "../../Constants/Constants";

export const updateUser = (data) => {
    return {
        type: ACTION_TYPES.UPDATE_USER,
        payload: data
    }
};