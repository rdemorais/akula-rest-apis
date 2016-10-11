var pg = require('pg');
var conString = "postgres://[USER]:[PASS]@localhost/restapi";
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