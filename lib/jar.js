module.exports = function (gulp,liferay_config) {
  const gutil = require('gulp-util');
  const mvn = require('maven').create({
    cwd: liferay_config.maven_dir,
    debug: false
  });
  
  return function (done) {
    gutil.log('Construction of Liferay JAR begins ...');
    mvn.execute(['clean', 'install'], {'skipTests': true}).then(() => {
      gutil.log('Construction of Liferay JAR completes');
      done();
    });
  }
};