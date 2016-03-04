import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
import Navigation from '../components/navigation';
import { getCatalogue } from '../actions';
import config from '../config';

/**
 * @constant statics
 * @type {Object}
 */
const statics = {

    /**
     * @method fetchData
     * @param {Function} dispatch
     * @return {Promise}
     */
    fetchData: dispatch => {
        return dispatch(getCatalogue());
    }

};

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    children: PropTypes.element.isRequired,
    options: PropTypes.shape({
        menuOpen: PropTypes.bool.isRequired
    })
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    const isOpen = props.options.menuOpen;
    const sectionClasses = `layout ${isOpen ? 'open' : 'closed'}`;

    return (
        <section className={ sectionClasses }>
            <header>
                <h1>{config.title}</h1>
                <Navigation {...props} />
            </header>
            {props.children}
        </section>
    );

};

export default stitch({ statics, propTypes, render }, state => state);
