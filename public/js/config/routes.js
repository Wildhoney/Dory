import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { identity } from 'ramda';
import Layout from '../containers/layout';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NotFound from '../containers/not-found';

export default store => {

    /**
     * @method top
     * @return {void}
     */
    const top = () => global.scrollTo(0, 0);

    /**
     * @method fetchData
     * @param {Object} params
     * @param {Object} routes
     * @param {Function} replace
     * @param {Function} callback
     * @type {Object}
     */
    const fetchData = ({ params, routes }, replace, callback) => {

        const promises = routes.map(route => {
            const retrievesData = route.component && typeof route.component.fetchData === 'function';
            return retrievesData && route.component.fetchData(store.dispatch, params);
        }).filter(identity);

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
