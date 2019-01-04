const order = (state = {}, action) => {
	let newState = [];
    switch (action.type) {
        case 'SET_ORDER':
            return {
                order: action.payload,
                start: action.payload[0]
            };
        case 'STEP_FORWARD_ORDER':
            newState = [...state.order];
            const first = newState.shift();
            newState.push(first);
            return {
                ...state,
                order: newState
            };
        case 'STEP_BACKWARD_ORDER':
            newState = [...state.order];
            const last = newState.pop();
            newState.unshift(last);
            return {
                ...state,
                order: newState
            };
        case 'CLEAR_ORDER':
            return {};
        default:
            return state;
    }
};

export default order;
