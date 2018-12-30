const createMultiReducer = resource => (state = {}, action) => {
    resource = resource.toUpperCase();
    switch (action.type) {
        case `SET_MANY_${resource}`:
            return action.payload.reduce((accumulator, item) => {
                accumulator[item.id] = item;
                return accumulator;
            }, {});
        case `ADD_${resource}`:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case `DELETE_${resource}`:
            return Object.entries(state).reduce((accumulator, [key, value]) => {
                if (parseInt(key, 10) !== action.payload) {
                    accumulator[key] = value;
                }
                return accumulator;
            }, {});
        default:
            return state;
    }
};

export default createMultiReducer;
