const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/content_sctipts.ts',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist/')
    },
    resolve: {
        modules: [path.join(__dirname, './src'), path.join(__dirname, './node_modules')],
        extensions: ['.ts', '.js', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '*.png',
                    to: '../dist',
                    context: 'src'
                },
                {
                    from: 'manifest.json',
                    to: '../dist',
                    context: 'src'
                }
            ]
        })
    ]
};
