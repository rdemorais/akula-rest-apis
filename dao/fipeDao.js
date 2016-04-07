var dao = require('./dao.js');

var sqlMarcasTipo = "SELECT id as codigo, nome from tb_marca_fipe where tipo = $1::text"
var sqlModelos = "SELECT id as codigo, nome from tb_modelo_fipe where tipo = $1::text and fabricante = $2::text"
var sqlAnos = "SELECT id as codigo, nome from tb_ano_modelo_fipe where tipo = $1::text and modelo = $2::text"

var fipeDao = (function(){
	return {
		listMarcas: function(tipo, callback) {
			dao.execute(callback, sqlMarcasTipo, [tipo]);
		},
		listModelos: function(tipo, fabricante, callback) {
			dao.execute(callback, sqlModelos, [tipo, fabricante]);
		},
		listAnos: function(tipo, modelo, callback) {
			dao.execute(callback, sqlAnos, [tipo, modelo]);
		}
	}
})();

module.exports = fipeDao;