var pg = require('pg');
var conString = "postgres://akula_api:serenaya@localhost/akula_rest_api";

var sqlBancos = 'SELECT codigo, nome from tb_banco';
var sqlBancoByCod = 'SELECT codigo, nome from tb_banco WHERE codigo = $1::text';
var sqlBancoByNome = "SELECT codigo, nome from tb_banco WHERE lower(nome) like '%' ||lower($1::text)|| '%'";

var execute = function(callback, sql, param) {
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
			client.query(sql, [param], callbackCli);
		}
	});
};

var febrabanDao = (function() {
	return {
		findBancoByCod: function(cod, callback) {
			execute(callback, sqlBancoByCod, cod);
		},
		findBancoByNome: function(nome, callback) {
			execute(callback, sqlBancoByNome, nome);
		},
		listBancos: function(callback) {
			execute(callback, sqlBancos);
		}
	}
})();

module.exports = febrabanDao;