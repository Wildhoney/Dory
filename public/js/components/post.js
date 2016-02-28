import React, { PropTypes } from 'react';
import { stitch } from 'keo';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    model: PropTypes.shape({
        slug: PropTypes.string.isRequired
    }).isRequired
};

/**
 * @method render
 * @param {Object} props
 * @return {Object}
 */
const render = ({ props }) => {

    return (
        <h3>{props.model.slug}</h3>
    );

};

export default stitch({ propTypes, render });
