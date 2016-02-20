import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';

/**
 * @constant propTypes
 * @type {{posts: Number}}
 */
const propTypes = {
    posts: PropTypes.array.isRequired
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
            <h3>We have {props.posts.length} blog posts</h3>
        </section>
    );

};

export default stitch({ propTypes, render }, state => state);
