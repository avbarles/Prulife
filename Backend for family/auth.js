const jwt = require("jsonwebtoken");
// User defined string data that will be used to create our JSON web tokens 
// Used in algorith for encryptin our data which makes it difficult to decode the information withour the defined secret keyword

const secret = "CourseBookingAPI";
// [SECTION] JSON web tokens
/*
	- JSON web token or JWT is a way of securely passing information from the server to the frontend or to other parts of the server

	- information is kept secure through the use of the secret code
	-only the system knows the secret code that can decode the encrypted information
*/

// Token Creation

module.exports.createAccessToken = (user) => {
	// The data will be received from the registration form
	// Whne the user logs in, a token will be created with the user's information
	const data = {
		id : user._id,
		email : user.email,
		isAdmin : user.isAdmin
	};

	// Generate a JSON web token using the jwt's sign method
	//  generates the token using the form data and the secreet cdde with no additional options provided
	return jwt.sign(data, secret, {});
}

// Token Verification
module.exports.verify = (req, res, next) => {
	// The token retrieved from the request header
	//  This can e provided in postman under 
		// Authorization > Bearer token
	let token = req.headers.authorization;

	// Token received and is not undefined
	if (typeof token !== "undefined"){
		console.log(token);

		// The "slice" method takes only the token from the information sent via the request header
		// The token sent  is a type of "bearer" token which when received contains the workd "bearer" as a prefix to the string
		//  This removes the "Bearer " prefix and obtains only the token for verification
		token = token.slice(7, token.length)

		// Validate the token using the "verify" method decrypting the token usign the secret code
		return jwt.verify(token, secret, (err, data) => {

			// If JWT is not valid
			if(err){
				return res.send({auth: "failed"})
			// If JWT is valid
			}else {
				// Allows the application to proceed with the nexct middleware function/callback function in the route
				// The veriy method will be used as a middleware in the route to verify the token before proceeding to the function that invokes the controller function
				next();
			}
		})
	// Token does not exist
	} else {
		return res.send({auth : "failed"})
	};
};

// Token decryption
module.exports.decode = (token) => {
	// token received and is not undefined
	if(typeof token !== "undefined"){
		// retrieves only the token and removes the bearer prefix
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (err, data) => {
			if(err){
				return null;
			} else {
				//  the "decode" method is used to obtain the information from the JWT
				//  tHe {complete:true} option allws us to return the additional information form the JWT token
				//  returns an object with access to the "payload" property which contains the user infromation stored when the token was generated
				// The payload contains information provided inthe createAccessToken method defined above( e.g. id, email and isAdmin)
				return jwt.decode(token, {complete:true}.payload);
			}
		})
	// Token does not exist
	} else{
		return null;
	}
}
