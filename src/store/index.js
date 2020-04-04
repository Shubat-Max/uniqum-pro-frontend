import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import reducers from '../reducers';
import randomid from '../middlewares/randomid'

const enhancer = applyMiddleware(
    thunk,
    randomid
);

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    enhancer
);

//dev only
// window.store = store;

export default store;