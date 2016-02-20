import React from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';

/**
 * @method render
 * @return {XML}
 */
const render = () => {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
        </ul>
    );
};

export default stitch({render});
