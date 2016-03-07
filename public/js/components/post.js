import React, { PropTypes } from 'react';
import { stitch, memoize } from 'keo';
import { Link } from 'react-router';
import moment from 'moment';
import { url } from 'gravatar';
import config from '../config';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    synopsis: PropTypes.number,
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
        synopsis: 0,
        model: {
            slug: '',
            title: '',
            createdDate: Date.now(),
            content: ''
        }
    };
};

/**
 * @method synopsis
 * @param {String} content
 * @param {Number} amountRequired
 * @return {String}
 */
const synopsis = memoize((content, amountRequired) => {
    return content.match(/<p>.+?<\/p>/ig).slice(0, amountRequired).join('');
});

/**
 * @constant Author
 * @type {XML}
 */
export const Author = stitch(({ props }) => {

    const {author} = props.model;
    const avatar = props.model.email ? <img src={url(props.model.email)} alt={`${author}'s avatar`} /> : '';

    return (
        <div className="author">
            by <Link to="/" rel="author">
                {avatar}
                <label>{author}</label>
            </Link>
        </div>
    );

});

/**
 * @method render
 * @param {Object} props
 * @return {Object}
 */
const render = ({ props }) => {

    // Determine whether or not we're using the abstract for the post.
    const {content} = props.model;
    const html = props.synopsis === 0 ? content : synopsis(content, props.synopsis);

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
            <article dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
