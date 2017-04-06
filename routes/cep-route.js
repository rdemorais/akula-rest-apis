var express = require('express');
var router = express.Router();

var cepDao = require('../dao/cepDao.js');

//logradouro por cep
router.get('/:cep', function(req, res, next) {
	cepDao.findLogradouroByCep(function(result) {
		res.json(result.rows);
	});
});

module.exports = router;