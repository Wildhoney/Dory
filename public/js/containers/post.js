import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
// import { getPosts } from '../actions';

/**
 * @constant propTypes
 * @type {{posts: Number}}
 */
const propTypes = {
    catalogue: PropTypes.array.isRequired
};

/**
 * @constant statics
 * @type {Object}
 */
const statics = {

    /**
     * @method fetchData
     * @param {Function} dispatch
     * @param {Object} params
     * @return {Promise}
     */
    // fetchData: (dispatch, params) => {
        // return dispatch(getPost(params.slug));
    // }

};

/**
 * @method dispatch
 * @param {Function} dispatch
 * @param {Object} props
 * @return {void}
 */
const componentDidMount = ({ dispatch, props }) => {
    // statics.fetchData(dispatch, props.params);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <main className="page post">

            <h2>{props.params.slug}</h2>

        </main>
    );

};

export default stitch({ statics, propTypes, componentDidMount, render }, state => state);
