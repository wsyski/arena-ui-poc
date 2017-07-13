exec = require('child_process').exec;

module.exports = {
    build_dir:            'build',
    dev_resources_dir:    'dev-resources',
    ngc_dir :             'ngcout',
    dist_dir:             'dist',
    aot_dir:              'aot',
    setupJarDeploy : function(gulp,liferay_config) {
      gulp.task('jar', require('./_lib/jar')(gulp,liferay_config));
      gulp.task('deploy', ['jar'],require('./_lib/deploy')(gulp,liferay_config));
    }
}