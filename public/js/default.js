import 'whatwg-fetch';
import 'array.from';
import Promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';

global.document.addEventListener('DOMContentLoaded', () => {

    render(
        <h1>Hello, Dory!</h1>,
        global.document.body
    );

});
