import { readFileSync } from 'fs';
import { render } from 'mustache';
import express from 'express';

import handleAssets from './components/assets';
import handleCatalogue from './components/catalogue';
import handlePost from './components/post';
import handleUniversal from './components/universal';

const app = express();
const options = {

    /**
     * @constant assetsPath
     * @type {String}
     */
    assetsPath: './core/build/assets',

    /**
     * @method fromCore
     * @param {String} path
     * @return {String}
     */
    fromCore: path => {
        return readFileSync(`./core/build/${path}`, 'utf8');
    },

    /**
     * @method fromPublic
     * @param {String} path
     * @return {String}
     */
    fromPublic: path => {
        return readFileSync(`./public/${path}`, 'utf8');
    },

    /**
     * @method toJson
     * @param {Object} model
     * @return {String}
     */
    toJson: model => JSON.stringify(model),

    /**
     * @method fromJson
     * @param {String} text
     * @return {Object}
     */
    fromJson: text => JSON.parse(text)

};

// Define the routes.
app.use('/assets', handleAssets(options));
app.get('/posts/:page', handleCatalogue(options));
app.get('/post/:slug', handlePost(options));
app.use(handleUniversal(options));

export default app;
