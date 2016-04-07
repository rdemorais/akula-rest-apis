var pg = require('pg');
var conString = "postgres://akula_api:serenaya@localhost/akula_rest_api";

var sqlEstados = 'SELECT uf, nome FROM tb_estado';
var sqlMunicipios = 'SELECT ibge, nome FROM tb_municipio WHERE uf = $1::text';
var sqlMunicipioIbge = 'SELECT ibge, nome FROM tb_municipio WHERE uf = $1::text and ibge = $2::text';

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
			client.query(sql, param, callbackCli);
		}
	});
};

var federacaoDao = (function(){
	return {
		listEstados: function(callback) {
			execute(callback, sqlEstados);
		},
		listMunicipios: function(uf, callback) {
			execute(callback, sqlMunicipios, [uf]);	
		},
		findMunicipioIbge: function(uf, ibge, callback) {
			execute(callback, sqlMunicipioIbge, [uf, ibge]);	
		}
	}
})();

module.exports = federacaoDao;