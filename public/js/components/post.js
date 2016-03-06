import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';
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
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return {
        model: {
            slug: '',
            title: '',
            createdDate: Date.now(),
            content: ''
        }
    };
};

/**
 * @method render
 * @param {Object} props
 * @return {Object}
 */
const render = ({ props }) => {

    return (
        <main className="post component">
            <h3>
                <Link to={`/post/${props.model.slug}`} className="invert">
                    {props.model.title}
                </Link>
            </h3>
            <datetime>{ moment(props.model.createdDate).format(config.dateFormat) }</datetime>
            <div dangerouslySetInnerHTML={{ __html: props.model.content }} />
        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
