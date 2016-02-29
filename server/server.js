import express from 'express';
import { readFileSync } from 'fs';

// Enable development for things like hot reloading.
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';

// Handlers for the various endpoints.
import handleAssets from './components/assets';
import handleCatalogue from './components/catalogue';
import handlePost from './components/post';
import handleUniversal from './components/universal';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const options = {

    /**
     * @constant assetsPath
     * @type {String}
     */
    assetsPath: './core/build/assets',

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

if (!isProduction) {

    // Setup development mode using Webpack when NODE_ENV is not production.
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));

}

// Define the routes.
app.use('/assets', handleAssets(options));
app.get('/posts/:page', handleCatalogue(options));
app.get('/post/:slug', handlePost(options));
app.use(handleUniversal(options));

export default app;
