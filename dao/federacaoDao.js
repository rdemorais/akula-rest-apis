
var dao = require('./dao.js');

var sqlEstados = 'SELECT uf, nome FROM tb_estado';
var sqlMunicipios = 'SELECT ibge, nome FROM tb_municipio WHERE uf = $1::text';
var sqlMunicipioIbge = 'SELECT uf, ibge, nome FROM tb_municipio WHERE uf = $1::text and ibge = $2::text';
var sqlMunicipioNome = "SELECT uf, ibge, nome FROM tb_municipio WHERE uf = $1::text and lower(nome) like '%'||lower($2::text)||'%'";

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
		},
		findMunicipioNome: function(uf, nome, callback) {
			dao.execute(callback, sqlMunicipioNome, [uf, nome]);	
		}
	}
})();

module.exports = federacaoDao;