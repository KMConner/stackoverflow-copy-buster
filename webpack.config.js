const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/content_sctipts.ts',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
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
            ]})
    ]
};
