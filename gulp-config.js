exec = require('child_process').exec;

module.exports = {
    build_dir:            'build',
    dev_resources_dir:    'dev-resources',
    ngc_dir :             'ngcout',
    aot_dir:              'aot',
    liferay_dir:          'liferay',
    setupJarDeploy : function(gulp,liferay_config) {
      gulp.task('jar', require('./lib/jar')(gulp,liferay_config));
      gulp.task('deploy', ['jar'],require('./lib/deploy')(gulp,liferay_config));
    }
};