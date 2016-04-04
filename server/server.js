import express from 'express';
import compression from 'compression';
import { readFileSync } from 'fs';
import { loadFront } from 'yaml-front-matter';
import { load as loadYaml } from 'yaml-js';
import { configure } from './routes';
import { isProduction } from './helpers/common';
import config from '../public/js/config';

// Enable development for things like hot reloading.
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';

// Instantiate Express application and apply required middleware.
const app = express();
app.use(compression());

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
     * @constant git
     * @type {Object}
     */
    repository: () => {
        const remoteOrigin = String(config.repository);
        const matches = remoteOrigin.match(/(.+?)\/(.+)/i);
        return { user: matches[1], repo: matches[2] };
    },

    /**
     * @method fromCore
     * @param {String} path
     * @return {String}
     */
    fromCore: path => readFileSync(`./core/build/${path}`, 'utf8'),

    /**
     * @method fromPublic
     * @param {String} path
     * @return {String}
     */
    fromPublic: path => readFileSync(`./public/${path}`, 'utf8'),

    /**
     * @method toJson
     * @param {Object} model
     * @return {String}
     */
    toJson: model => JSON.stringify(model)

};

if (!isProduction()) {

    // Setup development mode using Webpack when NODE_ENV is not production.
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));

}

// Define the routes.
configure(options)(app);

export default app;
