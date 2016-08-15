var express = require('express');
var router = express.Router();
var ad = require('../models/ad');

router.get('/', function(req, res, next) {
  res.render('index', {layout: 'home'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {title: 'About Us'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {title: 'Contact Us'});
});

router.get('/search', function(req, res, next) {
	ad.searchByKeywordsAndLoc(req.query.q, req.query.loc, function(data){
		res.render('search', {title: 'Search Results', q:req.query.q, data: data});
	});
});

router.get('/create', function(req, res, next) {
	res.render('create');
});

module.exports = router;
