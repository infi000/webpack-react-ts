const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode_webpack = argv.mode; //获取webpack开发模式
const _mode_node = process.env.NODE_ENV; //获取node开发模式 其实无所胃 用一个就行了
const _modeconfig = require(`./config/webpack.${_mode_node}.js`); //获取对应配置文件
const resolve = dir => {
    return path.resolve(__dirname, dir);
};
//html打包配置项
const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/web/index.html'),//源文件
    title:"yideng",
    filename: "index.html"//生成的内存中首页名称
});

//  css打包配置项,编译文件和输出路径
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "src/[name].[hash:5].css",//输出文件
    chunkFilename: "static/style/[name].[hash:5].css"//流文件，虚拟的 dev时候的
});

//向外部暴露一个打包配置对象，webpack基于node构建的，所以支持所有node api和语法
let webpackConfig = {
    entry:{
        app:"./src/web/index.tsx",
    },
    output: {
        path: resolve("dist/assets"), // string
        publicPath: '/', // root Dir
        sourceMapFilename: '[name].map',
        chunkFilename: 'static/script/[name].[chunkhash:5].js',
        filename: 'static/script/[name].[hash:5].js'
    },
    plugins: [
        htmlWebpackPlugin,
        miniCssExtractPlugin
    ],
    module: {//所有第三方插件配置规则
        rules: [//第三方匹配规则
            {
                test: /\.(j|t)sx$/,
                use: "babel-loader",
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: _mode_node==='development',
                        }
                    },
                    // 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,//允许css-loaer模块之前有几个loader先加载
                            //  modules: true,//css 模块化引入
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',//css类名
                        }
                    },
                    'postcss-loader',
                ]
            }

        ]
    },
    resolve: {
        extensions: [".js", ".jsx",".tsx", ".ts",".css", ".json"],//表示这几个文件的后缀名可以省略，自动不全，按顺序
        alias: {
            "@": resolve("src/web/")//@就表示项目根目录src的这层路径
        }
    },
    //优化
    optimization: {
        //将依赖统一打包 不和业务代码放一起
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                // lib: {
                //     name: 'vendor',
                //     test: /node_modules/,
                //     priority: 1,
                //     chunks: 'all',
                //     enforce: true
                // },
                react: {
                    name: 'vendor',
                    test: /[\\/]node_modules\/(react|redux)[\\/]/,
                    priority: 1,
                    chunks: 'all'
                },
                antd: {
                    name: 'vendor1',
                    test: /[\\/]node_modules\/antd[\\/]/,
                    priority: 0,
                    chunks: 'all'
                },
                default: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: -10,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `manifest.${entrypoint.name}`
        },
    },
}


module.exports = merge(webpackConfig, _modeconfig);