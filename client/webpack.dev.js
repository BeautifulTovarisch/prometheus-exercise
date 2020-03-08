const path = require( 'path' );
const merge = require( 'webpack-merge' );
const webpack = require( 'webpack' );
const commonConfig = require( './webpack.config' );

const API_VERSION = process.env.API_VERSION || 'v0';
const SERVER_PORT = process.env.PORT || '2305';
const WEBPACK_HOST = '0.0.0.0';
const WEBPACK_PORT = '3000';

const devConfig = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',

    devServer: {
        port: WEBPACK_PORT,
        host: WEBPACK_HOST,
        stats: "minimal",
        inline: true,
        noInfo: true,
        compress: true,
        contentBase: path.resolve(__dirname, '/dist'),
        historyApiFallback: true,
        proxy: {
            '/api': `http://server:${SERVER_PORT}/${API_VERSION}`
        }
    }
};

module.exports = merge( commonConfig, devConfig );
