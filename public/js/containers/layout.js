import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
import { Link } from 'react-router';
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
 * @method dispatch
 * @param {Function} dispatch
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

    const isOpen = props.options.menuOpen;
    const sectionClasses = `layout ${isOpen ? 'open' : 'closed'}`;

    return (
        <section className={ sectionClasses }>
            <header>
                <h1><Link to="/">Dory</Link></h1>
                <Navigation {...props} />
            </header>
            {props.children}
            <footer>
                <aside>Powered by <a href="https://github.com/Wildhoney/Dory">Dory</a>.</aside>
                <ul>
                    <li className="rss"><a href="/rss" /></li>
                    <li className="contact"><Link to="/" /></li>
                </ul>
            </footer>
        </section>
    );

};

export default stitch({ statics, propTypes, componentDidMount, render }, state => state);
