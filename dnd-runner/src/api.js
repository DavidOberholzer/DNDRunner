const apiURL = process.env.REACT_APP_API_URL;

export const getAll = (resource, filters) =>
    fetch(`${apiURL}${resource}`)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            return response.json();
        })
        .catch(error => {
            console.error(error);
        });

export const getRelated = (resource, id) =>
    fetch(`${apiURL}${resource}/${id}`)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            return response.json();
        })
        .catch(error => {
            console.error(error);
        });
