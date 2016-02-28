import 'array.from';
import Promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import routes from './config/routes';
import reducers from './reducers';
import { promise } from './helpers/middleware.js';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);
Promise.polyfill();

document.addEventListener('DOMContentLoaded', () => {

    const mountNode = document.querySelector('.dory');
    render((
        <Provider store={store}>
            {routes}
        </Provider>
    ), mountNode);

});
