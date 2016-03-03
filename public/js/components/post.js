import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import moment from 'moment';
import config from '../config';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    model: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string
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
            <h3>{props.model.title}</h3>
            <datetime>{ moment(props.model.createdDate).format(config.posts.dateFormat) }</datetime>
            <div dangerouslySetInnerHTML={{ __html: props.model.content }} />
        </section>
    );

};

export default stitch({ propTypes, render });
