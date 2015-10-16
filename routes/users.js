var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// .get to Read
router.get('/list', function(req, res){
	var db = req.db;
	db.collection("userlist").find().toArray(function(err, items){
		res.json(items);
	});
});

// .post to Create
router.post('/add', function(req, res){
	var db = req.db;
	db.collection('userlist').insert(req.body, function(err, result){
		res.send(
			(err === null) ? {msg: ''} : {msg: err}
		);
	});
});

// http .delete method to Delete
router.delete('/del/:id', function(req, res){
	var db = req.db;
	var userToDel = req.params.id;
	db.collection('userlist').removeById(userToDel, function(err, result){
		res.send((result === 1) ? {msg: ''} : {msg: 'Error: ' + err});
	});
})

// .put to Update
router.put('/upd/:id', function(req, res){
	var db = req.db;
	var id = req.params.id;
	db.collection('userlist').update( { _id: ObjectId(id) }, req.body, function(err, result){
		res.send(
			(err === null) ? {msg: ''} : {msg: err}
		);
	});
});

module.exports = router;
