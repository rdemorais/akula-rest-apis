var express = require('express');
var router = express.Router();

var fipeDao = require('../dao/fipeDao.js');

//marcas por tipo
router.get('/:tipo/marcas', function(req, res, next) {
	fipeDao.listMarcas(req.params.tipo, function(result) {
		res.json(result.rows);
	});
});

//modelos
router.get('/:tipo/marcas/:fabricante/modelos', function(req, res, next) {
	fipeDao.listModelos(req.params.tipo, req.params.fabricante, function(result) {
		res.json(result.rows);
	});
});

//modelos
router.get('/:tipo/marcas/:fabricante/modelos/:modelo/anos', function(req, res, next) {
	fipeDao.listAnos(req.params.tipo, req.params.fabricante, req.params.modelo, function(result) {
		res.json(result.rows);
	});
});

module.exports = router;