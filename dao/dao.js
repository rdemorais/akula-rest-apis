var pg = require('pg');
const yaml = require('js-yaml');
const config = yaml.safeLoad(fs.readFileSync('/opt/db/dbconfig.yml', 'utf8'));

var user 	= config.user;
var passwd 	= config.passwd;
var host	= config.host;
var db		= config.db; 

var conString = "postgres://"+user+":"+passwd+"@"+host+"/"+db;
dao = (function(){
	return {
		execute: function(callback, sql, param) {
			var client = new pg.Client(conString);
			client.connect(function(err) {
				if(err) {
					return console.error('could not connect to postgres', err);
				}

				callbackCli = function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}

					callback(result);

					client.end();
				};
				
				if(typeof param === 'undefined') {
					client.query(sql, callbackCli);
				}else {
					client.query(sql, param, callbackCli);
				}
			});
		}
	}
})();

module.exports = dao;