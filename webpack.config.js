require('babel-loader');
require('sass-loader');

module.exports = {
    entry: {
        dory: ['./public/js/default.js']
    },
    output: {
        path: __dirname + '/core/build',
        filename: '[name].js',
	    library: 'keo',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};
