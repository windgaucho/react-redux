var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: PATHS.app,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                // test espera una expresion regular.
                test: /\.css$/,
                loaders: ['style', 'css'],
                // include acepta un path o array de paths
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: PATHS.app
            }
        ]
    },
    plugins: []
};

//configuracion por default
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            // muestra solo errores
            stats: 'errors-only',
            host: process.env.HOST,
            port: 3000 || process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET === 'build') {
    module.exports = merge(common, {});
}
