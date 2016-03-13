import React, { PropTypes } from 'react';
import { stitch } from 'keo';

/**
 * @method propTypes
 * @type {Object}
 */
const propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string,
    children: PropTypes.node.isRequired
};

/**
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return { icon: '', onClick: () => {}, className: '' };
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    const style = { backgroundImage: `url(${props.icon})` };

    return (
        <main className={`component button ${props.className} ${props.icon && 'icon'}`.trim()}>
            <button style={style} onClick={ event => props.onClick(event) }>
                {props.children}
            </button>
        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
