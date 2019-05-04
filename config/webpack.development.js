let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');//友好的错误提示插件
let notifier = require('node-notifier');
const HOST = '127.0.0.1';
const PORT = '8080';

let friendlyErrorsPlugin = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages: [`你的程序运行在这里==> http://${HOST}:${PORT}`],
        notes: ['有些附加说明要在成功编辑时显示']
    },
    onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
        if (severity !== 'error') {
            return;
        }
        const error = errors[0];
        notifier.notify({
            title: "Webpack error",
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            // icon: ICON
        });
    },
    // should the console be cleared between each compilation?
    // default is true
    clearConsole: true,
    // add formatters and transformers (see below)
    additionalFormatters: [],
    additionalTransformers: []
})

module.exports = {
    plugins: [
        friendlyErrorsPlugin,
    ],
    devServer: {
        contentBase: './dist',//开发服务器地址 
        hot: true,//热更新？
        host: HOST,
        port: PORT,
        proxy: {//代理 api =>代理api
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' }
            }
        },
        quiet: true,//错误通知开关
    },
    devtool: "source-map",
}
