const apiURL = process.env.REACT_APP_API_URL;

const standardHeaders = token => ({
    headers: {
        Authorization: `JWT ${token}`
    }
});

const postHeaders = (data, token) => ({
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

const apiCalls = {
    auth: ({ data }) => fetch(`${apiURL}auth`, postHeaders(data, '')),
    getUser: ({ token }) => fetch(`${apiURL}user`, standardHeaders(token)),
    getAll: ({ resource, token }) => fetch(`${apiURL}${resource}`, standardHeaders(token)),
    getRelated: ({ resource, id, token }) =>
        fetch(`${apiURL}${resource}/${id}`, standardHeaders(token)),
    addNew: ({ resource, data, token }) => fetch(`${apiURL}${resource}`, postHeaders(data, token)),
    update: ({ resource, id, data, token }) =>
        fetch(`${apiURL}${resource}/${id}`, postHeaders(data, token)),
    delete: ({ resource, id, token }) =>
        fetch(`${apiURL}${resource}/${id}`, {
            method: 'DELETE',
            ...standardHeaders(token)
        }),
    uploadImage: ({ data, token }) =>
        fetch(`${apiURL}images`, { method: 'POST', ...standardHeaders(token), body: data })
};

const apiCall = (type, requestObject) => {
    return apiCalls[type](requestObject)
        .then(async response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                if (response.status === 401) {
                    localStorage.clear();
                }
                const json = await response.json();
                throw Error(json.message || json.description);
            }

            return response.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
};

export default apiCall;
