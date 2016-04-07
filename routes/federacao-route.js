var express = require('express');
var router = express.Router();

var federacaoDao = require('../dao/federacaoDao.js');

//estados
router.get('/estados', function(req, res, next) {
	federacaoDao.listEstados(function(result) {
		res.json(result.rows);
	});
});

//municipios
router.get('/estados/:uf/municipios', function(req, res, next) {
	federacaoDao.listMunicipios(req.params.uf, function(result) {
		res.json(result.rows);
	});
});

//municipios por ibge
router.get('/estados/:uf/municipios/:ibge', function(req, res, next) {
	federacaoDao.findMunicipioIbge(req.params.uf, req.params.ibge, function(result) {
		res.json(result.rows);
	});
});

module.exports = router;