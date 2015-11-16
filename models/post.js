var mongoose = require('mongoose');
var Schema   = mongoose.Schema; 

var postSchema = new mongoose.Schema({
	created_by: String,
	created_at: {type: Date, default: Date.now},
	text: String
});

module.exports = mongoose.model('Post', postSchema);