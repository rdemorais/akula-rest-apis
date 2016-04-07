var pg = require('pg');
var conString = "postgres://akula_api:serenaya@localhost/akula_rest_api";

var sqlMarcasTipo = "SELECT id as codigo, nome from tb_marca_fipe where tipo = $1::text"
var sqlModelos = "SELECT id as codigo, nome from tb_modelo_fipe where tipo = $1::text and fabricante = $2::text"
var sqlAnos = "SELECT id as codigo, nome from tb_ano_modelo_fipe where tipo = $1::text and modelo = $2::text"

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

var fipeDao = (function(){
	return {
		listMarcas: function(tipo, callback) {
			execute(callback, sqlMarcasTipo, [tipo]);
		},
		listModelos: function(tipo, fabricante, callback) {
			execute(callback, sqlModelos, [tipo, fabricante]);
		},
		listAnos: function(tipo, fabricante, modelo, callback) {
			execute(callback, sqlAnos, [tipo, modelo]);
		}
	}
})();

module.exports = fipeDao;