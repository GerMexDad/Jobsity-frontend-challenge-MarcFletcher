const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Frontend Challenge',
            template: './src/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
                
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: {
                        limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(scss)$/,
                use: [{
                  loader: 'style-loader', // inject CSS to page
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                        }
                    }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
        ],
    },
};