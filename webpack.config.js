const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  mode: 'development',
  entry: {
    background: './app/src/background.ts',
    chromereload: './app/src/chromereload.ts',
    contentscript: './app/src/contentscript.ts',
    watcher: './app/src/watchers/watcher.ts'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/app/scripts/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin({
      port: 35829
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
};
