import React from 'react';
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
 * @method componentDidMount
 * @param {Object} dispatch
 * @return {void}
 */
const componentDidMount = ({dispatch}) => {
    statics.fetchData(dispatch);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({props}) => {

    return (
        <section className={styles}>
            <h1>Welcome to Dory</h1>
            <Navigation />
            <main>
                {props.children}
            </main>
        </section>
    );
    
};

export default stitch({ statics, componentDidMount, render }, state => state);
