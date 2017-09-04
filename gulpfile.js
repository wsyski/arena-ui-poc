const config = require('./gulp-config');
const gulp = require('gulp');
const replace = require('gulp-replace');
const merge = require('gulp-merge');
const webpackDevServer = require('webpack-dev-server');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const sequence = require('gulp-sequence');
const named = require('vinyl-named');

const webpackConfig = require('./webpack.config');
const webpackConfig_aot = require('./webpack.config.aot');

/*
 * Clean working directories
 */
gulp.task('clean', function () {
  return gulp.src([config.build_dir, config.ngc_dir, config.aot_dir], {read: false})
    .pipe(clean({force: true}));
});

/*
 * Copy developer resources into build directory.
 */
gulp.task("dev-resources", function () {
  var main = gulp.src([config.dev_resources_dir + '/*.html', config.dev_resources_dir + '/favicon.ico',
    config.dev_resources_dir + '/aui/**', config.dev_resources_dir + '/json/*'], {base: config.dev_resources_dir})
    .pipe(gulp.dest(config.build_dir));
  /*
  var jquery = gulp.src([config.node_dir + '/jquery/dist/jquery.js'], {base: config.node_dir+ '/jquery/dist'})
    .pipe(gulp.dest(config.build_dir+'/jquery'));
  var bootstrap = gulp.src([config.node_dir + '/bootstrap/dist/**'], {base: config.node_dir+ '/bootstrap/dist'})
    .pipe(gulp.dest(config.build_dir+'/bootstrap'));
  */
  return merge(main);
});

/*
 Minification
 */
gulp.task("uglify", function () {
  return gulp.src([config.build_dir + '/main.js'])
    .pipe(uglify())
    .pipe(gulp.dest(config.build_dir));
});

/*
 *  Install global scripts needed by Angular
 */
gulp.task('globals', function () {
  return gulp.src(['globals/ax-bootstrap.js', 'node_modules/zone.js/dist/zone.js', 'node_modules/core-js/client/shim.js'])
    .pipe(gulpif(/zone\.js$/, replace(/&& define\.amd/, '&& define.amdxxx')))
    .pipe(gulp.dest(config.build_dir))
});

/*
 * Copy Angular runtime and portlet loader.
 */
gulp.task("install-ng-runtime", function () {
  return gulp.src(['ng-runtime/*.js'])
    .pipe(gulp.dest(config.build_dir));
});

/*
 * Build the application for development-mode
 */
gulp.task('app', function () {
  return gulp.src(['./src/main.ts'])
  // see docs for webpack-stream; allows us to use the webpack bundle name(s)
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(config.build_dir));
});

/*
 * Build the application for production-mode
 */
gulp.task('app_aot', function () {
  return gulp.src(['./src/main_aot.ts']) //,'./src/vendor_aot.ts'])
  // see docs for webpack-stream; allows us to use the webpack bundle name(s)
    .pipe(named())
    .pipe(webpackStream(webpackConfig_aot, webpack))
    .pipe(gulp.dest(config.build_dir));
});

/*
 Development build
 */
gulp.task("build", function () {
  sequence('clean', ['dev-resources', 'install-ng-runtime', 'globals', 'app'])(function (err) {
    if (err) gutil.log(err);
  });
});

/*
 Production build
 */
gulp.task("prod", function () {
  sequence('clean', ['install-ng-runtime', 'globals', 'app_aot'], 'uglify')(function (err) {
    if (err) gutil.log(err);
  });
});

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
 */
let liferay_config = {
  maven_dir: config.liferay_dir,
  jar_file: path.join(config.liferay_dir, 'target', 'arena-ui-poc-1.0.0.jar'),
  gogo_port: 11311
};

/*
 Liferay JAR creation and deployment tasks
 configure the 'jar' and 'deploy' tasks based on npm/gradle environment
 */
config.setupJarDeploy(gulp, liferay_config);

/*
 * Use webpack to watch for changes in application files.
 * then rebuild contents into the DXP JAR & re-deploy.
 */

function showWebpackSummary(stats) {
  gutil.log('[webpack-watch]\n' + stats.toString({
    colors: true,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: true
  }));
}

gulp.task('watch', (cb) => {

  gulp.watch([config.build_dir + "/main.js"]).on('change', function (e) {
    gutil.log('Application has been updated. Re-deploying...');
    sequence('deploy')(function (err) {
      if (err) gutil.log(err);
    });
  });
  let localWebpackConfig = Object.create(webpackConfig);
  localWebpackConfig.watch = true;
  localWebpackConfig.cache = true;
  localWebpackConfig.bail = false;

  webpack(localWebpackConfig, function (error, stats) {
    if (error) {
      gutil.log('[webpack]' + error.toString());
    }
    showWebpackSummary(stats);
  });
});

gulp.task("webpack-dev-server", function (cb) {
  let localWebpackConfig = Object.create(webpackConfig);
  localWebpackConfig.devtool = "eval";

  // Start a webpack-dev-server
  new webpackDevServer(webpack(localWebpackConfig), {
    contentBase: webpackConfig.output.path,
    stats: {
      colors: true
    }
  }).listen(8081, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});
