const createSingleReducer = (resource, initial) => (state = initial, action) => {
    resource = resource.toUpperCase();
    switch (action.type) {
        case `SET_${resource}`:
            return action.payload;
        case `CLEAR_${resource}`:
            return initial;
        default:
            return state;
    }
};

export default createSingleReducer;
