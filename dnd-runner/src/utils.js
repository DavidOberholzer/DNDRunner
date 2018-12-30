export const isEmpty = obj => Object.keys(obj).length === 0;

export const titleCase = string =>
    string &&
    string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
