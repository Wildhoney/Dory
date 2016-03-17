import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navigation from '../components/navigation';
import Loading from '../components/loading';
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
    loading: PropTypes.array.isRequired,
    options: PropTypes.shape({
        menuOpen: PropTypes.bool.isRequired
    }),
    fetchData: PropTypes.func
};

/**
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return { fetchData: dispatch => statics.fetchData(dispatch) };
};

/**
 * @method dispatch
 * @param {Object} props
 * @param {Function} dispatch
 * @return {void}
 */
const componentDidMount = ({ props, dispatch }) => {
    props.fetchData(dispatch);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <section className={`layout ${props.options.menuOpen ? 'open' : 'closed'}`}>
            <header>
                <h1><Link to="/">{config.title}</Link></h1>
                <Navigation {...props} />
                <Loading {...props} />
            </header>
            {props.children}
            <footer>
                <aside>
                    Powered by <a href="https://github.com/Wildhoney/Dory">Dory</a>.
                </aside>
                <ul>
                    <li className="rss"><a href="/rss" /></li>
                    <li className="contact"><Link to="/" /></li>
                </ul>
            </footer>
        </section>
    );

};

export const Component = stitch({ statics, propTypes, getDefaultProps, componentDidMount, render });
export default connect(state => state)(Component);
