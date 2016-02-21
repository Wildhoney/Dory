import React from 'react';
import { stitch } from 'keo/redux';
import Navigation from '../components/navigation';
import { getCatalogue } from '../actions';

/**
 * @constant statics
 * @type {Object}
 */
const statics = {

    /**
     * @method fetchData
     * @param {Function} dispatch
     * @type {Promise}
     */
    fetchData: dispatch => {
        return dispatch(getCatalogue());
    }

};

/**
 * @method componentDidMount
 * @param {Object} dispatch
 * @return {void}
 */
const componentDidMount = ({dispatch}) => {
    statics.fetchData(dispatch);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({props}) => {
    return (
        <section className="dory">
            <h1>Layout</h1>
            <Navigation />
            {props.children}
        </section>
    );
};

export default stitch({ statics, componentDidMount, render }, state => state);
