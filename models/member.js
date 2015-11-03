var mongoose = require('mongoose');
var timestamps = require('mongoose-times');
var Schema = mongoose.Schema; 


var MemberSchema = new Schema({
	name: String, 
	email: String
});

module.exports = mongoose.model('Member', MemberSchema);