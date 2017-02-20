const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin')
    ;

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        filename: 'build.js',
        path: 'dist'
    },
    devtool: 'source-map',
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.js', '.html']
    },
    resolveLoader: {
        modules: ['node_modules']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            mangle: false
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            server: {
                baseDir: 'dist'
            },
            ui: false,
            online: false,
            notify: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['angular2-template-loader', 'ts-loader'],
                exclude: /(node_modules)/
            },
            {
                test: /\.html$/,
                use: ['raw-loader'],
                exclude: /(node_modules)/
            }
        ]
    }
};