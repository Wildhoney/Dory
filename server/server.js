import { join } from 'path';
import { readFileSync } from 'fs';
import { render } from 'mustache';
import express from 'express';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../public/js/config/routes';
import reducers from '../public/js/reducers';

const app = express();
const documentHtml = readFileSync('./public/index.html', 'utf8');

app.use('/assets', express.static(join('./core/build/assets')));

app.use((request, response) => {

    const location = createLocation(request.url);
    const store = createStore(reducers);

    match({ routes, location }, (error, redirectLocation, renderProps) => {

        if (error) {
            return response.status(500).end('Internal server error.');
        }

        if (!renderProps) {
            return response.status(404).end('Not found.');
        }

        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        const componentHtml = renderToString(InitialComponent);
        response.end(render(documentHtml, { content: componentHtml }));

    });

});

export default app;
