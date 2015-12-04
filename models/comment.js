var mongoose = require('mongoose');
var Schema   = mongoose.Schema; 

var commentSchema = new mongoose.Schema({
	created_by: String,
	comment: String,
	post_id: String,
	created_at: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Comment', commentSchema);