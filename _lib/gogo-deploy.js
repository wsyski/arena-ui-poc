'use strict';

let _ = require('lodash');
let GogoShell = require('gogo-shell');
let os = require('os');
let path = require('path');

let REGEX_WIN = /^win/;

let GogoDeployer = function(config) {
	GogoShell.call(this, config);

	config = config || {};

	this.connectConfig = config.connectConfig;
};

GogoDeployer.prototype = _.create(GogoShell.prototype, {
	
	deploy: function(bundlePath,bundleSymbolicName) {
		let instance = this;

		return this.connect(this.connectConfig)
			.then(function() {
				return instance._getBundleStatusByBundleName(bundleSymbolicName);
			})
			.then(function(data) {
				if (data.length) {
					return instance._updateBundle(data[0].id, bundlePath);
				}
				else {
					return instance._installBundle(bundlePath);
				}
			})
			.then(function(data) {
				if (data.indexOf('Bundle ID') > -1) {
					let bundleId = instance._getBundleIdFromResponse(data);
					return instance._startBundle(bundleId);
				}

				return data;
			});
	},

	_updateBundle: function(bundleId, bundlePath) {
		return this.sendCommand('update', bundleId, this._formatBundleURL(bundlePath));
	},

	_getBundleStatusByBundleName: function(bundleSymbolicName) {
		return this.sendCommand('lb -u -s | grep', bundleSymbolicName)
			.then(function(data) {
				return _.reduce(data.split('\n'), function(result, item, index) {
					let fields = item.split('|');

					if (fields.length === 4) {
						result.push({
							id: _.trim(fields[0]),
							level: _.trim(fields[2]),
							status: _.trim(fields[1]),
							updateLocation: _.trim(fields[3])
						});
					}

					return result;
				}, []);
			});
	},

	_formatBundleURL: function(bundlePath) {
		if (this._isWin()) {
			bundlePath = '/' + bundlePath.split(path.sep).join('/');
		}
		else {
			bundlePath = '//' + bundlePath;
		}
		bundlePath = bundlePath.replace(/\s/g, '%20');
		return 'file:' + bundlePath;
	},

	_getBundleIdFromResponse: function(response) {
		let match = response.match(/Bundle\sID:\s*([0-9]+)/);
		return match ? match[1] : 0;
	},

	_installBundle: function(bundlePath) {
		return this.sendCommand('install', this._formatBundleURL(bundlePath));
	},

	_isWin: function() {
		return REGEX_WIN.test(os.platform());
	},

	_startBundle: function(bundleId) {
		return this.sendCommand('start', bundleId);
	}
});

module.exports.GogoDeployer = GogoDeployer;
