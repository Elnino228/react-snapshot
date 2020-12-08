const defaultTheme = 'light';

export const themeReducer = (state = defaultTheme, action) => {
    switch (action.type) {
        case 'SWITCH_THEME':
            if (state === 'light') {
                return 'dark';
            } else {
                return 'light';
            }
        default:
            return state;
    }
};