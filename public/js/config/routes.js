import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from '../containers/layout';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NotFound from '../containers/not-found';

export default (
    <Router history={browserHistory} onUpdate={() => global.scrollTo(0, 0)}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Posts} />
            <Route component={Posts} path="/archive/page-:pageNumber" />
            <Route component={Post} path="/post/:slug" />
            <Route component={NotFound} path="*" />
        </Route>
    </Router>
);
