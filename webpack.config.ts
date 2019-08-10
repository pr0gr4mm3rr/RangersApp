import path from 'path'
import webpack from 'webpack'
import WorkboxPlugin from 'workbox-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import BundleAnalyzer from 'webpack-bundle-analyzer'

let config: webpack.Configuration = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: '0.0.0.0',
        https: true
    },

    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: { collapseWhitespace: true, removeComments: true },
            inject: true
        }),
        new CopyPlugin([
            { from: 'src/assets/', to: 'assets/' }
        ]),
        new BundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analyzer.html'
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/sw-src.js',
            swDest: 'sw.js'
        })
    ],
    devtool: 'source-map'
}

export default config;