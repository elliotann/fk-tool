var webpack = require("webpack");
var path = require("path");
var env = process.env.NODE_ENV
var compress = process.env.COMPRESS

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var plugins = []

plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

if (env === 'production' && compress) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                "ascii_only": true
            },
            compressor: {
                warnings: false
            }
        })
    )
}

const extractCSS = new ExtractTextPlugin("${appName}.css");
plugins.push(extractCSS)


module.exports = {
    entry: ["./index.umd.js"],
    output: {
        filename: env === 'production' ? '${appName}.min.js': '${appName}.js',
        path: path.join(__dirname, "/dist/"),
        library: "${appName}",
        libraryTarget: "umd"
    },

    resolve: {
        extensions: [".js"]
    },

    externals: {
        "react": {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        "react-dom": {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        "immutable": {
            root: 'Immutable',
            commonjs2: 'immutable',
            commonjs: 'immutable',
            amd: 'immutable'
        },
        "mk-sdk": "MK",
        "mk-app-loader": {
            root:["MK","appLoader"],
            commonjs:"MK.appLoader",
            commonjs2:"MK.appLoader",
            amd:"MK.appLoader"
        },
        "fk-utils": {
            root:["FK","utils"],
            commonjs2:"FK.utils",
            amd:"FK.utils",
            commonjs:"FK.utils",
           
        },
        "fk-component": {
            root:["FK","component"],
            commonjs2:"FK.component",
            amd:"FK.component",
            commonjs:"FK.component"
        },
        "fk-meta-engine":  {
            commonjs:["FK","metaEngine"],
            commonjs2:"FK.metaEngine",
            amd:"FK.metaEngine",
            root:"FK.metaEngine"
        },
        "mk-aar-form":"mk-aar-form",
        "mk-aar-grid":"mk-aar-grid"
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: ['css-loader']
            })
        }, {
            test: /\.less$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 8192
                }
            }
        }]
    },

    plugins: plugins
}

if (env === 'development') {
    module.exports.devtool = 'source-map'
}
