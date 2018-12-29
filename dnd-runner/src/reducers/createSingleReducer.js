const createSingleReducer = resource => (state = {}, action) => {
    resource = resource.toUpperCase();
    switch (action.type) {
        case `SET_${resource}`:
            return action.payload;
        case `CLEAR_${resource}`:
            return {};
        default:
            return state;
    }
};

export default createSingleReducer;
