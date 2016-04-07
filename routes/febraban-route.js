var express = require('express');
var router = express.Router();

var febrabanDao = require('../dao/febrabanDao.js');

//todos os bancos
router.get('/', function(req, res, next) {
	febrabanDao.listBancos(function(result) {
		res.json(result.rows);
	});
});

//pelo codigo
router.get('/codigo/:cod', function(req, res, next) {
	febrabanDao.findBancoByCod(req.params.cod, function(result) {
		res.json(result.rows);
	});
});

//por parte do nome do banco
router.get('/nome/:nome', function(req, res, next) {
	febrabanDao.findBancoByNome(req.params.nome, function(result) {
		res.json(result.rows);
	});
});

module.exports = router;