module.exports = function (gulp, liferay_config) {
  return function () {

    //console.log('Construction of Liferay JAR begins ...');

    const zip = require('gulp-zip');
    const rename = require('gulp-rename');
    const replace = require('gulp-replace-task');
    const addsrc = require('gulp-add-src');
    const path = require('path');
    const xml2js = require('xml2js');
    var through = require('through2').obj;

    const JAR_PREFIX = "META-INF/resources/";

    var bundle_options = require('../bundle.json');
    bundle_options['options'].now = '' + Date.now();
    var jar_name = bundle_options['options'].jarName + '.jar';
    var jsnames = [], cssnames = [];
    var saved_files = [];
    var osgi_components = [];

    var clean = function (dirpath) {
      return dirpath.replace(/\\/g, "/");
    };

    var isOsgiComponent = function (fileName) {
      return fileName.match(/component-.+\.xml$/);
    };

    var buildProperty = function (valuesArr, tagname) {
      if (valuesArr.length == 0) return null;
      var _valuesArr = valuesArr.map(function (jsFile) {
        if (jsFile.charAt(0) == '*') {
          return jsFile.substring(1)
        } else {
          return jsFile
        }
      });
      var prop = {};
      var attrs = {
        name: tagname,
        type: 'String'
      };
      prop.$ = attrs;
      if (_valuesArr.length == 1) {
        attrs.value = _valuesArr[0];
        return prop;
      }
      prop._ = _valuesArr.join('\n');
      return prop;
    };

    var updateProperties = function (osgi_component, stream, cb, liferay_config) {
      var xmlstr = osgi_component.contents.toString();
      var parser = new xml2js.Parser({async: false});
      xml2js.parseString(xmlstr, function (err, result) {
        if (err) {
          throw err;
        } else {
          var properties = result['scr:component']['property'];

          var prop = null;

          if (liferay_config.auto_register_js) {

            var jsFiles = liferay_config.jsnames || jsnames;

            var jsHeaders = jsFiles.filter(function (jsFile) {
              return jsFile.charAt(0) == '*';
            });
            if (jsHeaders.length) {
              prop = buildProperty(jsHeaders, 'com.liferay.portlet.header-portlet-javascript');
              if (prop) properties.push(prop);
            }

            var jsFooters = jsFiles.filter(function (jsFile) {
              return jsFile.charAt(0) != '*';
            });
            if (jsFooters.length) {
              prop = buildProperty(jsFooters, 'com.liferay.portlet.footer-portlet-javascript');
              if (prop) properties.push(prop);
            }
          }

          prop = null;
          if (liferay_config.auto_register_css) {
            prop = buildProperty(cssnames, 'com.liferay.portlet.header-portlet-css');
          }
          if (prop) properties.push(prop);

          var builder = new xml2js.Builder();
          var xml = builder.buildObject(result);
          osgi_component.contents = new Buffer(xml.toString());
          stream.push(osgi_component);
          console.log('Construction of Liferay JAR completes.');
        }
      });
    };

    return gulp.src(liferay_config.inputs)
      .pipe(rename(function (path) {
        path.dirname = JAR_PREFIX + path.dirname;
      }))
      .pipe(addsrc(['_liferay/*INF/**/*', '_liferay/*content/**/*']))
      .pipe(replace({patterns: [{json: bundle_options['options']}]}))
      .pipe(through(function (file, enc, cb) {
        var f = path.parse(file.path);
        var basename = f.name + f.ext;
        if (isOsgiComponent(basename)) {
          osgi_components.push(file);
        } else {
          var gulppath = clean(path.relative(file.base, file.path));
          gulppath = gulppath.substring(JAR_PREFIX.length);
          if (f.ext === '.js') {
            jsnames.push('/' + gulppath);
          }
          if (f.ext === '.css') {
            cssnames.push('/' + gulppath);
          }
          if (basename === 'MANIFEST.MF') {
            this.push(file);
          } else {
            saved_files.push(file);
          }
        }
        cb();
      }, function (cb) {
        for (var i in saved_files) {
          this.push(saved_files[i])
        }
        for (var i in osgi_components) {
          if (liferay_config.auto_register_js || liferay_config.auto_register_css) {
            updateProperties(osgi_components[i], this, cb, liferay_config);
          } else {
            this.push(osgi_components[i]);
          }
        }
        cb();
      }))
      .pipe(zip(jar_name))
      .pipe(gulp.dest(liferay_config.dist));
  }
};