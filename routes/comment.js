module.exports = function(router, mongoose, Comment){

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// Hvis brugeren er Authenticated, kører next() for at kalde den next request handler 
	// Passport tilføjer denne metode til requrest objekter. Middleware er tilladt for at tilføje egenskaber 
	//til request and response objects

	//Hvis authenticated må man kører GET request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// Hvis brugeren ikke er Autenticated bliver man smidt tilbage til login/registration
	return res.redirect('/');
};

//Registere authentication middleware
router.use('/comments', isAuthenticated);

router.route('/comments')
	//Laver et nyt post!
	.post(function(req, res){

		var comment = new Comment();
		comment.comment = req.body.comment;
		comment.created_by = req.body.created_by;
		comment.post_id = req.body.post_id;

		comment.save(function(err, comment) {
			if (err){
				return res.send(500, err);
			}
			return res.json(comment);
		});
	})
	//henter alle posts
	.get(function(req, res){
		Comment.find(function(err, comments){
			if(err){
				return res.send(500, err);
				console.log('Fejl kan ikke finde post');
			}
			return res.send(200,comments);
			console.log('Sejt, alle posts!');
		});
	});

//Unikke post - GET
router.route('/comments/:id')
	//Henter/GET det unikke post via id
	.get(function(req, res){
		Comment.findById(req.params.id, function(err, comment){
			if(err)
				res.send(err);
			res.json(comment);
		});
	}) 
	//updatere det unikke post
	.put(function(req, res){
		Comment.findById(req.params.id, function(err, comment){
			if(err)
				res.send(err);

		comment.comment = req.body.comment;
		comment.created_by = req.body.created_by;
		comment.post_id = req.body.post_id;


			comment.save(function(err, comment){
				if(err)
					res.send(err);

				res.json(comment);
			});
		});
	})
	//sletter et post via id
	.delete(function(req, res) {
		Comment.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});

}