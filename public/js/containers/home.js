import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';

/**
 * @constant propTypes
 * @type {{posts: Number}}
 */
const propTypes = {
    catalogue: PropTypes.array.isRequired
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
        <section>
            <h2>Welcome to Dory!</h2>
            <h3>We have {props.catalogue.length} blog posts</h3>
        </section>
    );

};

export default stitch({ propTypes, getDefaultProps, render }, state => state);
