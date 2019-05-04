const CleanWebpackPlugin = require('clean-webpack-plugin');//清理
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//js压缩
const optimizeCssAssetsPlugin = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
})

module.exports = {
  plugins: [
        new CleanWebpackPlugin(),//清理文件
        optimizeCssAssetsPlugin
    ],
    //优化
    // optimization: {
      
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true
    //         })
    //     ]
    // },
}