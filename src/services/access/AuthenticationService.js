import store from "../../redux/store";
import * as userAction from '../../redux/actions/userAction'

export const AuthenticationService = {
    login,
    logout,
    isLogin
};

function login(username, password) {
    if (username === 'admin' && password === '123') {
        localStorage.setItem('user', JSON.stringify({username, password}));
        store.dispatch(userAction.login({username, password}));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('user');
    store.dispatch(userAction.logout());
}

function isLogin() {
    return !!localStorage.getItem('user');
}