export const AuthenticationService = {
    login,
    logout,
    isLogin
};

function login(username, password) {
    if (username === 'admin' && password === '123') {
        localStorage.setItem('user', JSON.stringify({username, password}));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('user');
}

function isLogin() {
    return !!localStorage.getItem('user');
}