import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
import Post from '../components/post';
import { getPost } from '../actions';

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
    fetchData: (dispatch, params) => {
        return dispatch(getPost(params.slug));
    }

};

/**
 * @method shouldComponentUpdate
 * @param {Object} nextProps
 * @param {Object} props
 * @return {Boolean}
 */
const shouldComponentUpdate = ({ nextProps, props }) => {
    return nextProps.catalogue !== props.catalogue;
};

/**
 * @method dispatch
 * @param {Function} dispatch
 * @param {Object} props
 * @return {void}
 */
const componentDidMount = ({ dispatch, props }) => {
    statics.fetchData(dispatch, props.params);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    const model = props.catalogue.find(post => post.slug === props.params.slug);

    return (
        <main className="page post">
            <Post { ...props } model={ model } />
        </main>
    );

};

export default stitch({ statics, propTypes, shouldComponentUpdate, componentDidMount, render }, state => state);
