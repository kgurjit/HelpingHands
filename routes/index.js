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

router.get('/listing', function(req, res, next) {
	ad.getById(req.query.id, function(details){
		res.render('listing', {details: details});
	});
});

router.get('/search', function(req, res, next) {
	ad.searchByKeywordsAndLoc(req.query.q, req.query.loc, function(data){
		console.log('Rcvd data from backend: ' + JSON.stringify(data));
		res.render('search', {title: 'Search Results', q:req.query.q, data: data});
	});
});

router.get('/create', function(req, res, next) {
	if(!req.isAuthenticated()) {
      res.redirect('/signin');
	   } else {
	      var user = req.user;
	      if(user !== undefined) {
	         user = user.toJSON();
	      }
	      ad.getAllCategories(function(categories){
			res.render('create', {title: 'Create Listing', categories: categories});
		});
	   }
	
});

router.post('/create', function(req, res, next) {
	ad.create(req.body, function(id){
		res.redirect('/listing?id=' + id);
	}, function(){
		res.render('error', {details: 'Listing could not be created'});
	});
});


module.exports = router;
