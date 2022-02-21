const path = require("path");
// 识别Vue语言
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 基本打包
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'ui-cli.common.js',
        libraryTarget: 'commonjs2', // 将库的返回值分配给module.exports
    },
    devServer: {
        port: 3000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false // 打包后清除多余的空格
                    }
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]

};
