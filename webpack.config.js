let webpack = require('webpack');
let path = require('path');

const appRoot = path.resolve('./src');

let bundleOptions = require('./bundle.json');
let bundleSymbolicName = bundleOptions['options'].bundleSymbolicName;
let webpackEntry = `AxMain_${bundleSymbolicName.replace(/[-\.]/g, '_')}`;

module.exports = {
  bail: true,
  entry: {
    // NOTE: entry settings will be overridden when invoked from gulp
    'main': ['./src/main.ts']
  },
  output: {
    filename: '[name].js', // NOTE: path will be overridden when invoked from gulp
    path: path.resolve('./build'),
    devtoolModuleFilenameTemplate: '[resource-path]',
    libraryTarget: 'var',
    library: webpackEntry
  },
  plugins: [new webpack.DllReferencePlugin({
    context: '.',
    manifest: require(path.join(__dirname, 'ng-runtime', 'ng-runtime-manifest.json'))
  }), new webpack.optimize.UglifyJsPlugin({
    debug: true,
    minimize: false,
    compress: false,
    beautify: true,
    mangle: false,
    sourceMap: true,
    comments: true
  }), // suppress Typescript warnings when building Angular into vendor package
    //new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,appRoot),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, appRoot),],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [// process Angular templates to inline HTML/CSS then invoke Typescript
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: 'tsconfig.json'}
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(css)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] 
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }],
    noParse: /path.join(__dirname,'node_modules', 'angular2', 'bundles')/
  },
  devtool: 'source-map'
};