var dao = require('./dao.js');

var sqlCep = 'select cep8 as cep, ' +
'cep.uf, ' +  
'cidade.cidade_acento as municipio, ' +
'tipo_acento as tipo, ' + 
'nome_acento as logradouro, ' +
'bairro1_acento as bairro ' + 
'from tb_cep_log as cep ' +
'inner join tb_cep_cidade as cidade on cep.chave = cidade.chave ' +
'where cep.cep8 = $1::text';

var cepDao = (function() {
	return {
		findLogradouroByCep: function(cep, callback) {
			dao.execute(callback, sqlCep, [cep]);
		}
	}
})();

module.exports = cepDao;