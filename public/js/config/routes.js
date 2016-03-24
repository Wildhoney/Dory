import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from '../containers/layout';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NotFound from '../containers/not-found';

/**
 * @method top
 * @return {void}
 */
const top = () => global.scrollTo(0, 0);

export default store => {

    /**
     * @method fetchData
     * @param {Object} params
     * @param {Object} routes
     * @param {Function} replace
     * @param {Function} callback
     * @type {Object}
     */
    const fetchData = function({ params, routes }, replace, callback) {

        const promises = routes.map(route => {

            if (route.component && typeof route.component.fetchData === 'function') {
                return route.component.fetchData(store.dispatch, params);
            }

            return false;

        }).filter(x => x !== false);

        Promise.all(promises).then(() => callback());

    };

    return (
        <Router history={browserHistory} onUpdate={top}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Posts} onEnter={fetchData} />
                <Route component={Posts} path="/archive/page-:pageNumber" onEnter={fetchData} />
                <Route component={Posts} path="/author/:name" onEnter={fetchData} />
                <Route component={Post} path="/post/:slug" onEnter={fetchData} />
                <Route component={NotFound} path="*" />
            </Route>
        </Router>
    );

};
