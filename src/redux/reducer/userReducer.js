import {ACTION_TYPES} from "../../Constants/Constants";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.UPDATE_USER:
            return action.payload;
        default:
            return state;
    }
};