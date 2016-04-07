var dao = require('./dao.js');

var sqlBancos = 'SELECT codigo, nome from tb_banco';
var sqlBancoByCod = 'SELECT codigo, nome from tb_banco WHERE codigo = $1::text';
var sqlBancoByNome = "SELECT codigo, nome from tb_banco WHERE lower(nome) like '%' ||lower($1::text)|| '%'";

var febrabanDao = (function() {
	return {
		findBancoByCod: function(cod, callback) {
			dao.execute(callback, sqlBancoByCod, [cod]);
		},
		findBancoByNome: function(nome, callback) {
			dao.execute(callback, sqlBancoByNome, [nome]);
		},
		listBancos: function(callback) {
			dao.execute(callback, sqlBancos);
		}
	}
})();

module.exports = febrabanDao;