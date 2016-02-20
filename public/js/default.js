import 'whatwg-fetch';
import 'array.from';
import Promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import routes from './config/routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
Promise.polyfill();

document.addEventListener('DOMContentLoaded', () => {

    const mountNode = document.querySelector('section.dory');
    render((
        <Provider store={store}>
            {routes}
        </Provider>
    ), mountNode);

});
