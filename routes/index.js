var express = require('express');
var router = express.Router();
var ad = require('../config/ad');

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
		console.log('Rcvd data from backend: ' + JSON.stringify(data));
		res.render('search', {title: 'Search Results', q:req.query.q, data: data});
	});
});

router.get('/create', function(req, res, next) {
	res.render('create', {title: 'Create Listing'});
});

module.exports = router;
