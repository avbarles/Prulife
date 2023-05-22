const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");



module.exports.checkEmailExists = (reqBody) => {
	// The result is sent back to the frontend via the "then" method found in the route file 
	return User.find({email : reqBody.email}).then(result => {
		console.log(result)
		//  The "find" method returns a record if a match is found
		if(result.length > 0){
			return true;
			// No duplicate email found
			//  The user is not yet registered in the database
		}else {
			return false;
		}
	})
};
module.exports.registerUser = (reqBody) => {
	// CReates a variable "newUser" and instantiates a new "User" object using the mongoose model
	//  uses the information from the request body to provide all the necessary infromation
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName : reqBody.lastName,
		age : reqBody.age,
		email : reqBody.email,
		mobileNo : reqBody.mobileNo,
		password : bcrypt.hashSync(reqBody.password, 10)

	})
	// Saves the created object to our database
	return newUser.save().then((user, error) => {
		// User registration failed
		if(error) {
			return false;
		}else {
			return true;
		}
	})
}

module.exports.retrieveAllUsers = () => {
	return User.find({}).then(result => {
		
		return result;
	})
}


module.exports.loginUser = (reqBody) => {
	// The "findOne" method returns the firt record in the collection that matches the search criteria
	// We use the "findOne" method instrad of the "find" method which returns all records that match the same criteria
	return User.findOne({email : reqBody.email}).then(result => {
		// User does not exist
		
		if(result == null){
			return "user does not exist";
		}else {

			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)
			if(isPasswordCorrect){
				// Generate an access token
				// Uses the "createCAccessToken" method defined in the "atuh.js" file
				// returning an object back to the frontend application is common practice to ensure infromation is properly labeled
				return{access : auth.createAccessToken(result)}
			}else {
				// passwords do not match
				return "Password does not match";
			}
		}
	})
}

module.exports.updateUser = (reqParams, reqBody, userData) => {
  // Specify the fields/properties of the document to be updated
  if (userData === false) {
    return Promise.resolve("Not an admin");
  } else {
    let updateUser = {
      	firstName: reqBody.firstName,
      	lastName: reqBody.lastName,
      	age: reqBody.age,
      	email: reqBody.email,
      	mobileNo: reqBody.mobileNo,
      	password: reqBody.password,
      	isAdmin: reqBody.isAdmin
      
    };

    return User.findByIdAndUpdate(reqParams.userId, updateUser, { new: true })
      .then((product) => {
        // user is not updated
        if (!user) {
          return false;
        }
        // User updated successfully
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
};

module.exports.getProfile = (userId) => {
  return User.findOne({ _id: userId })
    .then(result => {
      if (result == null) {
        return false;
      } else {
        const {firstName, lastName,  _id, isAdmin } = result; // Destructure the necessary fields
        return { firstName, lastName, _id, isAdmin }; // Return the user ID and isAdmin status
      }
    });
};


module.exports.retrieveUser = (reqParams) => {

	return User.findById(reqParams.userId).then(result => {
		return result;
	})
}

module.exports.deleteUser = (reqParams, userData) => {
  if (userData === false) {
    return Promise.resolve("Not an admin");
  } else {
    return User.findByIdAndDelete(reqParams.userId)
      .then((user) => {
        if (!user) {
          return false; // User not found
        }
        return true; // User deleted successfully
      })
      .catch((error) => {
        console.log(error);
        return false; // Error occurred during deletion
      });
  }
};




















module.exports.getAllUser = (userData) => {

	if(userData == false){
			return Promise.resolve("Not an admin");
		}else { 

				return User.find({}).then(result => {
				
				return result;
		})
		}

}


