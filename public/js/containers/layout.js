import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
import Navigation from '../components/navigation';
import { getCatalogue } from '../actions';
import styles from '../../css/containers/layout.css';

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
        <section className={ styles.container }>
            <header className={ styles.header }>
                <h1 className={ styles.h1Heading }>Dory</h1>
                <Navigation />
            </header>
            <main className={ styles.main }>
                {props.children}
            </main>
        </section>
    );

};

export default stitch({ statics, propTypes, componentDidMount, render }, state => state);
