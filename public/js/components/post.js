import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';
import moment from 'moment';
import { url } from 'gravatar';
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
 * @constant Author
 * @type {XML}
 */
export const Author = stitch(({ props }) => {

    const {author} = props.model;
    const avatar = props.model.email ? <img src={url(props.model.email)} alt={`${author}'s avatar`} /> : '';

    return (
        <div className="author">
            by <Link to="/" rel="author">{avatar}{author}</Link>
        </div>
    );

});

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
            <datetime>
                {moment(props.model.createdDate).format(config.dateFormat)}
            </datetime>
            {props.model.author ? <Author {...props} /> : ''}
            <article dangerouslySetInnerHTML={{ __html: props.model.content  }} />
        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
