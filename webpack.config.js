const path = require('path');
const merge = require('webpack-merge');
const poststylus = require('poststylus');
const webpack = require('webpack');
const pages = require('./webpack.config.pages.js');

const isProduction = process.env.NODE_ENV === 'production';

let config = {
    entry: {
        bundle: path.join(__dirname, 'src/js/main'),
        vendor: ['vue', 'vue-router', 'moment', 'vee-validate', 'collectionsjs']
    },
    output: {
        path: path.join(__dirname, 'docs/assets'),
        filename: 'js/[name].js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            stylus: {
                use: [poststylus(['autoprefixer'])]
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: [
                      ['es2015', { modules: false }]
                    ]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /\.woff(2)?(\?.*)?$/i,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
            {
                test: /.hbs$/,
                exclude: /node_modules/,
                loader: 'handlebars-loader'
            }
        ]
    }
};

config = merge(
    config,
    isProduction ? require('./webpack.config.prod.js') : require('./webpack.config.dev.js')
);

module.exports = merge(config, pages);
