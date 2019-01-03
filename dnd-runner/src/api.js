const apiURL = process.env.REACT_APP_API_URL;

const postHeaders = data => ({
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

const apiCalls = {
    getAll: ({ resource }) => fetch(`${apiURL}${resource}`),
    getRelated: ({ resource, id }) => fetch(`${apiURL}${resource}/${id}`),
    addNew: ({ resource, data }) => fetch(`${apiURL}${resource}`, postHeaders(data)),
    update: ({ resource, id, data }) => fetch(`${apiURL}${resource}/${id}`, postHeaders(data)),
    delete: ({ resource, id }) =>
        fetch(`${apiURL}${resource}/${id}`, {
            method: 'DELETE'
        })
};

const apiCall = (type, requestObject) => {
    return apiCalls[type](requestObject)
        .then(async response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                const json = await response.json();
                throw Error(json.message);
            }

            return response.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
};

export default apiCall;
