import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import DocumentTitle from 'react-document-title';
import config from '../config';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <DocumentTitle title={`${config.title} - ${props.title}`}>
            {props.children}
        </DocumentTitle>
    );

};

export default stitch({ propTypes, render });
