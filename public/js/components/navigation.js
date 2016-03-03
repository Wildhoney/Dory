import React from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';

/**
 * @method render
 * @return {XML}
 */
const render = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" className={ styles.anchor }>Home</Link>
                </li>
                <li>
                    <Link to="/" className={ styles.anchor }>Archive</Link>
                </li>
                <li>
                    <Link to="/" className={ styles.anchor }>Contact</Link>
                </li>
            </ul>
        </nav>
    );

};

export default stitch({ render });
