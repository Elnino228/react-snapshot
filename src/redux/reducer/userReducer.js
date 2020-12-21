import {ACTION_TYPES} from "../../Constants/Constants";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN:
            console.log(action.payload)
            return action.payload;
        case ACTION_TYPES.LOGOUT:
            return {};
        default:
            return state;
    }
};