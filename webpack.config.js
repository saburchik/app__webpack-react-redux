const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    devServer: {
        port: 3330,
        historyApiFallback: true
    },
    plugins: [
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg)/,
                use: ["file-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", '@babel/preset-env']
                    }
                }
            },
        ]
    }
}