var mongoose = require('mongoose');
var Schema = mongoose.Schema; 


var userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	phone: Number, 
	username: String,  
	password: String, //Bliver hashet af Passport
	created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);