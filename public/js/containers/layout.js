import React from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';
import Navigation from '../components/navigation';

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({props}) => {
    return (
        <section className="dory">
            <h1>Layout</h1>
            <Navigation />
            {props.children}
        </section>
    );
};

export default stitch({ render });
