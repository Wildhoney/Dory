import React, { PropTypes } from 'react';
import hash from 'object-hash';
import { stitch } from 'keo/redux';
import pluralize from 'pluralize';
import Post from '../components/post';

/**
 * @constant propTypes
 * @type {{posts: Number}}
 */
const propTypes = {
    catalogue: PropTypes.array.isRequired
};

/**
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return { catalogue: [] };
};

/**
 * @method personalGreeting
 * @return {String}
 */
const personalGreeting = () => {
    const greetings = ['Welcome', 'Willkommen', 'Bienvenido', 'Bem-vindo', 'Benvenuto', 'Bienvenue'];
    return greetings[Math.floor(Math.random() * greetings.length)];
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <section className="home">

            <h2>
                {personalGreeting()}
                <label>
                    ({props.catalogue.length} {(pluralize('Post', props.catalogue.length))})
                </label>
            </h2>

            {props.catalogue.map(model => <Post key={ hash(model) } model={model} />)}

        </section>
    );

};

export default stitch({ propTypes, getDefaultProps, render }, state => state);
