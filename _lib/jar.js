module.exports = function (gulp, liferay_config) {
  return function () {
    console.log('Construction of Liferay JAR begins ...');
    const zip = require('gulp-zip');
    const rename = require('gulp-rename');
    const replace = require('gulp-replace-task');
    const addsrc = require('gulp-add-src');
    const path = require('path');
    const xml2js = require('xml2js');
    let through = require('through2').obj;

    const JAR_PREFIX = "META-INF/resources/";

    let bundle_options = require('../bundle.json');
    bundle_options['options'].now = '' + Date.now();
    let jar_name = bundle_options['options'].jarName + '.jar';
    let jsnames = [], cssnames = [];
    let saved_files = [];
    let osgi_components = [];

    let clean = function (dirpath) {
      return dirpath.replace(/\\/g, "/");
    };

    let isOsgiComponent = function (fileName) {
      return fileName.match(/component-.+\.xml$/);
    };

    let buildProperty = function (valuesArr, tagname) {
      if (valuesArr.length === 0) return null;
      let _valuesArr = valuesArr.map(function (jsFile) {
        if (jsFile.charAt(0) === '*') {
          return jsFile.substring(1)
        } else {
          return jsFile
        }
      });
      let prop = {};
      let attrs = {
        name: tagname,
        type: 'String'
      };
      prop.$ = attrs;
      if (_valuesArr.length === 1) {
        attrs.value = _valuesArr[0];
        return prop;
      }
      prop._ = _valuesArr.join('\n');
      return prop;
    };

    let updateProperties = function (osgi_component, stream, cb, liferay_config) {
      let xmlstr = osgi_component.contents.toString();
      let parser = new xml2js.Parser({async: false});
      xml2js.parseString(xmlstr, function (err, result) {
        if (err) {
          throw err;
        } else {
          let properties = result['scr:component']['property'];

          let prop = null;

          if (liferay_config.auto_register_js) {

            let jsFiles = liferay_config.jsnames || jsnames;

            let jsHeaders = jsFiles.filter(function (jsFile) {
              return jsFile.charAt(0) == '*';
            });
            if (jsHeaders.length) {
              prop = buildProperty(jsHeaders, 'com.liferay.portlet.header-portlet-javascript');
              if (prop) properties.push(prop);
            }

            let jsFooters = jsFiles.filter(function (jsFile) {
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

          let builder = new xml2js.Builder();
          let xml = builder.buildObject(result);
          osgi_component.contents = new Buffer(xml.toString());
          stream.push(osgi_component);
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
        let f = path.parse(file.path);
        let basename = f.name + f.ext;
        if (isOsgiComponent(basename)) {
          osgi_components.push(file);
        } else {
          let gulppath = clean(path.relative(file.base, file.path));
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
        saved_files.forEach((saved_file) => {
          this.push(saved_file)
        });
        osgi_components.forEach((osgi_component) => {
          if (liferay_config.auto_register_js || liferay_config.auto_register_css) {
            updateProperties(osgi_component, this, cb, liferay_config);
          } else {
            this.push(osgi_component);
          }
        });
        cb();
      }))
      .pipe(zip(jar_name))
      .pipe(gulp.dest(liferay_config.dist));
  }
};