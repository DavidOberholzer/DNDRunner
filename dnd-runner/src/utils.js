export const isEmpty = obj => Object.keys(obj).length === 0;

export const titleCase = string =>
    string &&
    string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

export const pluralToSingular = word => {
    word = word.slice(0, -1);
    if (word.slice(-2) === 'ie') {
        word = `${word.slice(0, -2)}y`;
    }
    return word;
};
