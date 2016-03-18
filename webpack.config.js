const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        dory: ['./public/js/default.js', 'webpack-hot-middleware/client'],
        cache: ['./public/js/workers/cache.js', 'webpack-hot-middleware/client']
    },
    output: {
        path: __dirname + '/core/build',
        publicPath: '/',
        filename: '[name].js',
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
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!autoprefixer?browsers=last 2 version!sass?outputStyle=compact') }
]
    },
    plugins: [
        new ExtractTextPlugin('dory.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
