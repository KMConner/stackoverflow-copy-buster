// pathモジュールを読み(output.pathに絶対パスを指定するため)
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // モードの設定。指定可能な値は、none, development ,production（デフォルト）
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development',
    // アプリケーションが実行を開始されるポイント(エントリーポイント)
    // 配列で指定すると、すべての項目が実行される
    // https://webpack.js.org/configuration/entry-context/#entry
    entry: './src/content_sctipts.ts',
    output: {
        filename: 'bundle.js',
        // ビルド後のファイルが出力される"絶対パス"ディレクトリ
        // https://webpack.js.org/configuration/output/#outputpath
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
