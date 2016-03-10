import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';
import { setMenu } from '../actions';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    options: PropTypes.shape({
        menuOpen: PropTypes.bool.isRequired
    }).isRequired
};

/**
 * @method render
 * @param {Object} props
 * @param {Function} dispatch
 * @return {XML}
 */
const render = ({ props, dispatch }) => {

    const isOpen = props.options.menuOpen;
    const ulClasses = `${isOpen ? 'open' : 'closed'}`;

    return (
        <nav>
            <a className="icon" onClick={ () => dispatch(setMenu(!isOpen)) } />
            <ul className={ ulClasses }>
                <li className="home">
                    <Link to="/" className="invert">
                        Home
                    </Link>
                </li>
                <li className="archive">
                    <Link to="/" className="invert">
                        Archive
                    </Link>
                </li>
                <li className="contact">
                    <Link to="/" className="invert">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );

};

export default stitch({ propTypes, render });
