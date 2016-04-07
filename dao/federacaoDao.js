
var dao = require('./dao.js');

var sqlEstados = 'SELECT uf, nome FROM tb_estado';
var sqlMunicipios = 'SELECT ibge, nome FROM tb_municipio WHERE uf = $1::text';
var sqlMunicipioIbge = 'SELECT uf, ibge, nome FROM tb_municipio WHERE uf = $1::text and ibge = $2::text';

var federacaoDao = (function(){
	return {
		listEstados: function(callback) {
			dao.execute(callback, sqlEstados);
		},
		listMunicipios: function(uf, callback) {
			dao.execute(callback, sqlMunicipios, [uf]);	
		},
		findMunicipioIbge: function(uf, ibge, callback) {
			dao.execute(callback, sqlMunicipioIbge, [uf, ibge]);	
		}
	}
})();

module.exports = federacaoDao;