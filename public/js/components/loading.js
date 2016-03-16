import React, { PropTypes } from 'react';
import { stitch } from 'keo';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    loading: PropTypes.array.isRequired
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {
    return (
        <div className={`status-icon ${props.loading.length ? 'loading' : ''}`.trim()}>
            <img src="/images/loading.svg" alt="Loading" />
        </div>
    );
};

export default stitch({ propTypes, render });
