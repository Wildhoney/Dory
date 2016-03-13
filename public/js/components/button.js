import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';

/**
 * @method propTypes
 * @type {Object}
 */
const propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string,
    path: PropTypes.string,
    children: PropTypes.node.isRequired
};

/**
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return { icon: '', onClick: () => {}, className: '', path: null };
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    const style = { backgroundImage: `url(${props.icon})` };
    const children = props.path ? <Link to={props.path}>{props.children}</Link>
                                : <a>{props.children}</a>;

    return (
        <main className={`component button ${props.className} ${props.icon && 'icon'}`.trim()}>
            <button style={style} onClick={ event => props.onClick(event) }>
                {children}
            </button>
        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
