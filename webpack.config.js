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
  }),
    new webpack.optimize.UglifyJsPlugin({
      debug: true,
      minimize: false,
      compress: false,
      beautify: true,
      mangle: false,
      sourceMap: true,
      comments: true
    }),
    // suppress Typescript warnings when building Angular into vendor package
    //new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,appRoot),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, appRoot),],
  resolve: {
    extensions: ['*', '.ts', '.js']
  },
  module: {
    loaders: [// process Angular templates to inline HTML/CSS then invoke Typescript
      {
        test: /\.ts$/,
        loader: 'ts-loader!angular2-template-loader'
      }, // used to load Angular HTML/CSS files for templates
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      },],
    noParse: /path.join(__dirname,'node_modules', 'angular2', 'bundles')/
  },
  devtool: 'source-map'
};