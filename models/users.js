var mongoose = require('mongoose');
var Schema = mongoose.Schema; 


var userSchema = new Schema({
	username: String,  
	password: String, //Bliver hashet af Passport
	firstName: String,
	lastName: String,
	email: String,
	phone: Number, 
	created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);