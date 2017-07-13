module.exports = function (gulp, liferay_config) {
  return function () {
	  
	  console.log('Deployment of Liferay JAR begins...');
	  
	  const path = require('path');
	  var through = require('through2').obj;
	  var GogoDeployer = require('./gogo-deploy').GogoDeployer;

	  var bundleOptions = require('../bundle.json');
	  var bundleSymbolicName = bundleOptions['options'].bundleSymbolicName;
	  var jarName = bundleOptions['options'].jarName + '.jar';
	  
	  return gulp.src(path.join(liferay_config.dist,jarName))
	
		.pipe(through(function(file, enc, cb) {
			var config = {host: '127.0.0.1', port: liferay_config.gogo_port};
	        var gogoDeployer = new GogoDeployer({connectConfig: config});
	        gogoDeployer.on('error', function(err) {
		       console.log(err.message);
		       gogoDeployer.destroy();
			   cb();
	        });
	        gogoDeployer.deploy(file.path,bundleSymbolicName)
	          .then(function(data) {
		         if (data) console.log(data); 
		         else console.log('Finished--no msg available');
		         gogoDeployer.destroy();
				 console.log('Deployment of Liferay JAR completes.');
				 cb();
	          });			
        }))
}}  