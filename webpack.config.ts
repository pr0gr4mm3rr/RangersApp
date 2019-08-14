import path from 'path'
import webpack from 'webpack'
import WorkboxPlugin from 'workbox-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import BundleAnalyzer from 'webpack-bundle-analyzer'
import VueLoaderPlugin from 'vue-loader/lib/plugin'

let config: webpack.Configuration = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
            minify: { collapseWhitespace: true, removeComments: true,  },
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
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.vue', '.ts', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            Engine: path.resolve(__dirname, 'engine'),
            Game: path.resolve(__dirname, 'src/world'),
            Assets: path.resolve(__dirname, 'src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] },
                exclude: '/node_modules/'
            },
            { test: /\.vue$/, loader: 'vue-loader' },
            
            { test: /\.scss$/, loader: 'sass-loader' },
            { test: /\.css$/, use: [ 'css-loader', 'vue-style-loader' ]}
        ]
    },
    devtool: 'source-map',
    performance: {
        maxEntrypointSize: process.env.NODE_ENV === 'production' 
            // 100 kB prod 
            ? 100 * 2 ** 10
            // 1 MB dev
            : 1   * 2 ** 20
    }
}

export default config;