const genericAction = (actionType, resource, payload) => ({
    type: `${actionType}_${resource}`,
    payload
});

export default genericAction;
