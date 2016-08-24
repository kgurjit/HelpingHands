var express = require('express');
var passport = require('passport');
var router = express.Router();
var ad = require('../config/ad');

var nodemailer = require('nodemailer');

// router.get('/', function(req, res, next) {
// 	res.render('index', {
// 		layout: 'home'
// 	});
// });


router.get('/', function(req, res, next) {
    ad.getAllCategories(function(categories) {
            res.render('index', {
                layout: 'home',
                categories: categories
            });
        });
});

router.get('/about', function(req, res, next) {
	res.render('about', {
		title: 'About Us'
	});
});

router.get('/contact', function(req, res, next) {
	res.render('contact', {
		title: 'Contact Us'
	});
});
router.post('/contact', function(req, res, next) {

		var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'myappemail2016@gmail.com', 
            pass: 'RutgersBootcamp' 
        }
    });

    var mailOptions = {
	    from: 'myappemail2016@gmail.com', 
	    to: 'myappemail2016@gmail.com',
	    subject: 'Helping Hands Contact Us Details', 
	    html: "<h3>" + "Contact Name : " + req.body.contactname + "</h3>" + "<br>" +
	          "<h3>" + "Contact Email : " + req.body.contactemail + "</h3>" + "<br>" + 
	          "<h3>" + "Contact Phone : " + req.body.contactnumber + "</h3>" + "<br>" + 
	          "<h3>" + "Contact Details : " + req.body.contactmessage + "</h3>"
		};

		transporter.sendMail(mailOptions, function(error, info){
      console.log('Message sent: ' + info.response);
      res.redirect('/');
		});
});

router.get('/listing', function(req, res, next) {
	ad.getById(req.query.id, function(details) {
		res.render('listing', {
			details: details,
			title: details.title
		});
	});
});

router.get('/search', function(req, res, next) {
	ad.searchByKeywordsAndLoc(req.query.q, req.query.loc, function(data) {
		res.render('search', {
			title: 'Search Results (' + data.length + ')',
			q: req.query.q,
			data: data
		});
	});
});

router.get('/profile', function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/signin');
	} else {
		ad.getListingsForUser(req.user.id, function(listings){
			res.render('profile', {
				title: 'Profile',
				listings: listings
			});
		}, function(){
				res.render('error', {title: 'Application Error'});
			});
	}
});

router.get('/deleteListing', function(req, res, next){
	if(req.query.id) {
		ad.deleteListing(req.query.id, function(){
			res.redirect('profile');		
		}, function(){
			res.render('error');
		});
	} else {
		res.redirect('profile');
	}
});

router.get('/create', function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/signin');
	} else {
		var user = req.user;
		if (user !== undefined) {
			user = user.toJSON();
		}
		ad.getAllCategories(function(categories) {
			res.render('create', {
				title: 'Create Listing',
				categories: categories
			});
		});
	}

});

router.post('/create', function(req, res, next) {
	req.body.userId = req.user.id;
	ad.createListing(req.body, function(id) {
		res.redirect('/listing?id=' + id);
	}, function() {
		res.render('error', {
			title: 'Application Error'
		});
	});
});

router.get('/signin', function(req, res, next) {
	if (req.isAuthenticated()) res.redirect('/');
	res.render('signin', {
		title: 'Account Sign In'
	});
});

var signIn = function(req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/create',
		failureRedirect: '/signin'
	}, function(err, user, info) {
		if (err) {
			return res.render('signin', {
				title: 'Account Sign In',
				errorMessage: err.message
			});
		}

		if (!user) {
			return res.render('signin', {
				title: 'Account Sign In',
				errorMessage: info.message
			});
		}
		return req.logIn(user, function(err) {
			if (err) {
				return res.render('signin', {
					title: 'Account Sign In',
					errorMessage: err.message
				});
			} else {
				return res.redirect('/create');
			}
		});
	})(req, res, next);
};

router.post('/signin', signIn);

router.get('/signup', function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/createlisting');
	} else {
		res.render('signup', {
			title: 'Account Sign Up'
		});
	}
});

router.post('/signup', function(req, res, next) {
	var user = req.body;

	ad.createUser(user, function() {
		signIn(req, res, next);
	}, function(err) {
		res.render('signup', {
			title: 'Account Sign Up',
			errorMessage: err
		});
	});
});

router.get('/signout', function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/signin'); // Change it to home
	} else {
		req.logout();
		res.redirect('/signin'); // Change it to home
	}
});

module.exports = router;