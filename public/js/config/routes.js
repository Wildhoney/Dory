import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from '../containers/layout';
import Home from '../containers/home';
import Post from '../containers/post';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route component={Post} path="/post/:slug" />
        </Route>
    </Router>
);
