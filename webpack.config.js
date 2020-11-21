const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        background: './src/content_sctipts.ts',
        popup: './src/popup.ts'
    },
    output: {
        filename: '[name].js',
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
                },
                {
                    from: '*.html',
                    to: '../dist',
                    context: 'src'
                },
                {
                    from: '*.css',
                    to: '../dist',
                    context: 'src'
                }
            ]
        })
    ]
};
