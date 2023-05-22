const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	firstName : {
		type: String,
		required : [true, "First Name is required"]
	},
	lastName : {
		type: String,
		required : [true, "Last Name is required"]
	},
	age :{
		type: Number,
		required : [true, "Age is required"]
	},
	email : {
		type: String,
		required : [true, "Email is required"]
	},
	mobileNo : {
		type: Number,
		required : [true, "mobile Number is required"]
	},

	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
		
	}


	


});
module.exports = mongoose.model("User", userSchema);