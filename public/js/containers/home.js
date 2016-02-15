import React, {PropTypes} from 'react';
import {stitch} from 'keo';

/**
 * @constant propTypes
 * @type {{name: String}}
 */
const propTypes = {
    name: PropTypes.string.isRequired
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {
    return <h2>Welcome to Dory, {props.name}!</h2>;
};

export default stitch({ propTypes, render });
