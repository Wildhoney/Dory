import React from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';
import styles from '../../css/components/navigation.css';

/**
 * @method render
 * @return {XML}
 */
const render = () => {

    return (
        <nav className={ styles.container }>
            <ul className={ styles.list }>
                <li className={ styles.item }>
                    <Link to="/" className={ styles.anchor }>Home</Link>
                </li>
                <li className={ styles.item }>
                    <Link to="/" className={ styles.anchor }>Archive</Link>
                </li>
                <li className={ styles.item }>
                    <Link to="/" className={ styles.anchor }>Contact</Link>
                </li>
            </ul>
        </nav>
    );
    
};

export default stitch({ render });
