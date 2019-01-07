const createMultiListReducer = resource => (state = [], action) => {
    resource = resource.toUpperCase();
    switch (action.type) {
        case `SET_MANY_${resource}`:
            return action.payload;
        case `ADD_${resource}`:
            return [...state, action.payload];
        case `DELETE_${resource}`:
            return state.filter(value => value !== action.payload);
        default:
            return state;
    }
};

export default createMultiListReducer;
