const createReducer = (resource, compositeKeys = null) => (state = {}, action) => {
    switch (action.type) {
        case `ADD_${resource}`:
            const key = compositeKeys
                ? `${action.payload[compositeKeys[0]]}-${action.payload[compositeKeys[1]]}`
                : action.payload.id;
            return { ...state, [key]: action.payload };
        case `DELETE_${resource}`:
            return Object.entries(state)
                .filter(([key, value]) => key !== action.id)
                .reduce((accumulator, [key, value]) => {
                    accumulator[key] = value;
                    return accumulator;
                }, {});
        default:
            return state;
    }
};

export default createReducer;
