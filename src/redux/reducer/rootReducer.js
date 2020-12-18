import {themeReducer} from "./themeReducer";
import {combineReducers} from "redux";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    theme: themeReducer,
    userInfo: userReducer
});