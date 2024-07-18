const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
  })
  ,
  // new FaviconsWebpackPlugin({
  //   logo: path.resolve(PUBLIC_DIR, "favicon.ico"),
  //   prefix: "/favicons/",
  //   outputPath: path.resolve(BUILD_DIR, "favicons"),
  //   mode: "webapp",
  //   // Injecting into all HTML Files or separately (for an every instance of HtmlWebpackPlugin)
  //   // inject: true,
  //   inject: (htmlPlugin) =>
  //     path.basename(htmlPlugin.options.filename) === "index.html",
  //   favicons: {
  //     icons: {
  //       appleIcon: false, // Apple touch icons.
  //       appleStartup: false, // Apple startup images.
  //       android: false, // Android homescreen icon.
  //       favicons: true, // Regular favicons.
  //       coast: false, // Opera Coast icon.
  //       firefox: false, // Firefox OS icons.
  //       windows: false, // Windows 8 tile icons.
  //       yandex: false, // Yandex browser icon.
  //     },
  //   },
  //   cache: false, // Disallow caching the assets across webpack builds.
  // }),
  new webpack.HotModuleReplacementPlugin(), // For page reloading
]

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: 'none',
  entry: {
    app: path.join(__dirname, 'src', 'App.tsx')
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: '/node_modules/',
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        use: [{loader:'ts-loader',
          options: {
            transpileOnly: true
          }
        }],
        exclude: '/node_modules/',
        
      }
    ]
  },
  plugins: plugins
}