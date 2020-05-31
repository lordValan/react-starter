/* eslint-disable no-undef */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');
const { join } = require('path');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: join(__dirname, 'public'),
    progress: true,
    quiet: false,
    noInfo: false,
    stats: { colors: true }
}).listen(3000, '0.0.0.0', function (err) {
    if (err) {
        return console.log(err);
    }
});
