import 'array.from';
import ready from 'document-ready-promise';
import Promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import getRoutes from './config/routes';
import reducers from './reducers';
import promise from './utilities/middleware.js';

import '../sass/default.scss';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);
Promise.polyfill();

ready().then(() => {

    const mountNode = global.document.querySelector('.dory');

    // Register the Server Worker for caching assets and articles.
    'serviceWorker' in navigator && navigator.serviceWorker.register('/cache.js');

    render((
        <Provider store={store}>
            {getRoutes(store)}
        </Provider>
    ), mountNode);

});
