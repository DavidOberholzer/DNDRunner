const mode = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MODE':
            return action.payload;
        case 'RESET_MODE':
            return 'campaign';
        default:
            return state;
    }
};

export default mode;
