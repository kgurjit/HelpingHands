var express = require('express');
var router = express.Router();
var ad = require('../models/ad');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/search', function(req, res, next) {
	ad.searchByKeywordsAndLoc(req.query.q, req.query.loc, function(data){
		res.render('search', {q:req.query.q, data: data});
	});
});

router.get('/create', function(req, res, next) {
	res.render('create');
});

module.exports = router;
