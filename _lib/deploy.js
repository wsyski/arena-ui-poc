module.exports = function (gulp, liferay_config) {
  return function () {
	  
	  console.log('Deployment of Liferay JAR begins...');
	  
	  const path = require('path');
	  var through = require('through2').obj;
	  var GogoDeployer = require('./gogo_deploy').GogoDeployer;

	  var bundle_options = require('../bundle.json');
	  var osgi_name = bundle_options['options'].bundleName;
	  var jar_name = bundle_options['options'].jarName + '.jar';
	  
	  return gulp.src(path.join(liferay_config.dist,jar_name))
	
		.pipe(through(function(file, enc, cb) {
			var config = {host: '127.0.0.1', port: liferay_config.gogo_port};
	        var gogoDeployer = new GogoDeployer({connectConfig: config});
	        gogoDeployer.on('error', function(err) {
		       console.log(err.message);
		       gogoDeployer.destroy();
			   cb();
	        });
	        gogoDeployer.deploy(file.path,osgi_name)
	          .then(function(data) {
		         if (data) console.log(data); 
		         else console.log('Finished--no msg available');
		         gogoDeployer.destroy();
				 console.log('Deployment of Liferay JAR completes.');
				 cb();
	          });			
        }))
}}  