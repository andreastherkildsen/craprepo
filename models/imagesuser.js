var mongoose = require('mongoose');
var Schema   = mongoose.Schema; 

var imageUserSchema = new mongoose.Schema({
	imgUser: {
		data: Buffer,
		contentType: String
	}
});

module.exports = mongoose.model('imageUser', imageUserSchema);