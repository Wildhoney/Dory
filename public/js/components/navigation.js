import React from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';

/**
 * @method render
 * @return {XML}
 */
const render = ({ props }) => {

    console.log(props.options);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/">Archive</Link>
                </li>
                <li>
                    <Link to="/">Contact</Link>
                </li>
            </ul>
        </nav>
    );

};

export default stitch({ render });
