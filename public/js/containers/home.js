import React, { PropTypes } from 'react';
import hash from 'object-hash';
import { stitch } from 'keo/redux';
import pluralize from 'pluralize';
import Post from '../components/post';
import { getPosts } from '../actions';

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
        const pageNumber = params.pageNumber || 1;
        return dispatch(getPosts(pageNumber));
    }

};

/**
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return { catalogue: [] };
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <main className="home">

            <h2>
                Welcome
                <label>
                    ({props.catalogue.length} {(pluralize('Post', props.catalogue.length))})
                </label>
            </h2>

            { props.catalogue.map(model => <Post key={ hash(model) } { ...props } model={ model } />) }

        </main>
    );

};

export default stitch({ statics, propTypes, getDefaultProps, render }, state => state);
