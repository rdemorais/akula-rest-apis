var pg = require('pg');
var params = require('optimist').argv;

var user 	= params.u;
var passwd 	= params.p;
var host	= params.h;
var db		= params.d; 

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