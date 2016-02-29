const webpack = require('webpack');
require('babel-loader');
require('json-loader');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './public/js/default.js'
    ],
    output: {
        path: __dirname + '/core/build/assets',
        publicPath: '/assets/',
        filename: 'dory.js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'react', 'stage-0']
                }
            },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
