export const setOrder = order => ({
    type: 'SET_ORDER',
    payload: order
});

export const clearOrder = () => ({
    type: 'CLEAR_ORDER'
});

export const stepForwardOrder = () => ({
    type: 'STEP_FORWARD_ORDER'
});

export const stepBackwardOrder = () => ({
    type: 'STEP_BACKWARD_ORDER'
});
