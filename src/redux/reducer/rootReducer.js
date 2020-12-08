import {themeReducer} from "./themeReducer";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    theme: themeReducer
});