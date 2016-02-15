import 'whatwg-fetch';
import 'array.from';
import Promise from 'es6-promise';
import React from 'react';
import {render} from 'react-dom';
import Home from './containers/home';

Promise.polyfill();

document.addEventListener('DOMContentLoaded', () => {

    render(
        <Home name="Adam" />,
        document.querySelector('section.dory')
    );

});
