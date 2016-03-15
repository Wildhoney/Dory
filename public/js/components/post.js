import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';
import moment from 'moment';
import { url } from 'gravatar';
import config from '../config';
import { isOnline } from '../utilities/utility';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    synopsis: PropTypes.bool.isRequired,
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
        synopsis: false,
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

    const {author, email} = props.model;

    const avatar = !email || !isOnline() ? '' : (
        <img src={url(email)} alt={`${author}'s avatar`} onError={event => event.target.remove()} />
    );

    return (
        <div className="author">
            by <Link to="/" rel="author"><label>{author}</label>{avatar}</Link>
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
    const isSynopsis = (props.synopsis && props.model.hasOwnProperty('synopsis'));
    const post = isSynopsis ? props.model.synopsis : props.model.content;

    return (
        <main className="post component">

            <h3>
                <Link to={`/post/${props.model.slug}`}
                      className="invert" rel={`${props.model.paid ? 'nofollow' : ''}`}>
                    {props.model.title}
                </Link>
            </h3>

            <datetime>
                {moment(props.model.createdDate).format(config.dateFormat)}
            </datetime>

            {props.model.author ? <Author {...props} /> : ''}

            <article dangerouslySetInnerHTML={{ __html: post }} />

        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
