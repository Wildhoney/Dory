import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
import Navigation from '../components/navigation';
import { getCatalogue } from '../actions';

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
    children: PropTypes.element.isRequired
};

/**
 * @method componentDidMount
 * @param {Object} dispatch
 * @return {void}
 */
const componentDidMount = ({ dispatch }) => {
    statics.fetchData(dispatch);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <section className="layout">
            <header>
                <h1>Dory</h1>
                <Navigation />
            </header>
            <main>
                {props.children}
            </main>
        </section>
    );

};

export default stitch({ statics, propTypes, componentDidMount, render }, state => state);
