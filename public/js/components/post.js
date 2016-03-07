import React, { PropTypes } from 'react';
import { stitch } from 'keo/strict';
import { Link } from 'react-router';
import moment from 'moment';
import { url } from 'gravatar';
import config from '../config';

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
 * @method shouldComponentUpdate
 * @param {Object} nextProps
 * @param {Object} props
 * @return {Boolean}
 */
const shouldComponentUpdate = ({ nextProps, props }) => {
    return nextProps.model !== props.model;
};

/**
 * @constant Author
 * @type {XML}
 */
export const Author = stitch(({ props }) => {
    const {author} = props.model;
    const avatar = props.model.email ? <img src={url(props.model.email)} alt={`${author}'s avatar`} /> : '';
    return <div className="author">by <Link to="/" rel="author"><label>{author}</label>{avatar}</Link></div>
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
            <h3><Link to={`/post/${props.model.slug}`} className="invert">{props.model.title}</Link></h3>
            <datetime>{moment(props.model.createdDate).format(config.dateFormat)}</datetime>
            {props.model.author ? <Author {...props} /> : ''}
            <article dangerouslySetInnerHTML={{ __html: post }} />
        </main>
    );

};

export default stitch({ propTypes, shouldComponentUpdate, getDefaultProps, render });
