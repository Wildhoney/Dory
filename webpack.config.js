require('babel-loader');
require('sass-loader');

module.exports = {
    entry: {
        dory: ['./public/js/default.js']
    },
    output: {
        path: __dirname + '/core/build',
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
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};
