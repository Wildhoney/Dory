import React, { PropTypes } from 'react';
import { stitch } from 'keo';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    model: PropTypes.shape({
        meta: PropTypes.shape({
            title: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

/**
 * @method render
 * @param {Object} props
 * @return {Object}
 */
const render = ({ props }) => {

    return (
        <section>
            <h3>{props.model.meta.title}</h3>
            <p>{props.model.data ? props.model.data.__content : 'Loading...'}</p>
        </section>
    );

};

export default stitch({ propTypes, render });
