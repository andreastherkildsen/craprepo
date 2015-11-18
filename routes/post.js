module.exports = function(router, mongoose, Post){

router.route('/post')

	// Opretter et medlem
	.post(function(req, res) {
		
		var post = new Post();		
		post.text = req.body.text;

		post.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Der er oprettet et medlem!!' });
		});

		
	})

	// Henter ALLE medlemmer)
	.get(function(req, res) {
		Post.find(function(err, post) {
			if (err)
				res.send(err);

			res.json(post);
		});
	});

router.route('/post/:post_id')

	// Get aka henter et medlem udfra ID
	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	})

	// Opdatere et medlem med udfra ID
	.put(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {

			if (err)
				res.send(err);

			post.text = req.body.text;
			post.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Medlem updated!' });
			});

		});
	})

	// Sletter en medlem med udfra ID
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.post_id
		}, function(err, post) {
			if (err)
				res.send(err);

			res.json({ message: 'Bruger slettet' });
		});
	});

}
