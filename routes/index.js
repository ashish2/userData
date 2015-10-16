var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res){
	res.render('helloworld', {title: "Hello, World!"});
});

// router.get('/user/list', function(req, res){
// 	var db = req.db;
// 	var collection = db.get('usercollection');

// 	// Run collection.find function,
// 	// once u find the whole list of usercollection
// 	// pass that list into this new function() as docs variable
// 	// and render that docs(userlist) in the response
// 	collection.find({},{}, function(err, docs){

// 		res.render('userlist', {
// 			"userlist": docs
// 		});

// 	});
// });

router.get('/user/c', function(req, res){
	res.render('newuser', {title: "Add New User"});
});

router.post('/user/c', function(req, res){

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// Set our collection
	var collection = db.get('usercollection');

	// Submit to the DB
	collection.insert({
		"username": userName,
		"email": userEmail,
	}, function(err, doc){
		if(err){
			// If it failed, return error
			res.send("There was a problem adding the information to database.");
		}
		else {
			// If it worked, set the header so the address bar doesn't still say /user/c
			// res.location('user/list');
			// And forward to success page;
			res.redirect("/user/list");
		}
	});
	
});



module.exports = router;
