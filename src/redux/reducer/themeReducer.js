import {ACTION_TYPES} from "../../Constants/Constants";

const defaultTheme = 'light';

export const themeReducer = (state = defaultTheme, action) => {
    switch (action.type) {
        case ACTION_TYPES.SWITCH_THEME:
            if (state === 'light') {
                return 'dark';
            } else {
                return 'light';
            }
        default:
            return state;
    }
};