import express from 'express';
import { readFileSync } from 'fs';
import { loadFront } from 'yaml-front-matter';
import { load as loadYaml } from 'yaml-js';
import { configure } from './routes';

// Enable development for things like hot reloading.
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const options = {

    /**
     * @constant assetsPath
     * @type {String}
     */
    assetsPath: './core/build/assets',

    /**
     * @constant publicPath
     * @type {String}
     */
    publicPath: './public',

    /**
     * @constant config
     * @type {Object}
     */
    config: loadYaml(readFileSync('./dory.yml')),

    /**
     * @constant isProduction
     * @type {Boolean}
     */
    isProduction,

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

// if (!isProduction) {
//
//     // Setup development mode using Webpack when NODE_ENV is not production.
//     const compiler = webpack(webpackConfig);
//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
//     app.use(webpackHotMiddleware(compiler));
//
// }

// Define the routes.
configure(options)(app);

export default app;
