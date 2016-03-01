import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import moment from 'moment';
import config from '../config';
import styles from '../../css/components/post.css';

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
        <section className={ styles.container }>
            <h3 className={ styles.h3Heading }>{props.model.title}</h3>
            <datetime className={ styles.dateTime }>
                { moment(props.model.createdDate).format(config.posts.dateFormat) }
            </datetime>
            <div className={ styles.content } dangerouslySetInnerHTML={{ __html: props.model.content }} />
        </section>
    );

};

export default stitch({ propTypes, render });
