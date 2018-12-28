import { createStore } from 'redux';

import { runnerApp } from './reducers';

const store = createStore(
    runnerApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
