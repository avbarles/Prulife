const express = require("express")
const router = express.Router();
const userController = require("../controllers/user");

const auth = require("../auth");

router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
})

// for users to register an account
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
})

router.get("/all", (req,res) => {
	userController.retrieveAllUsers().then(resultFromController => res.send(resultFromController))
});
// for users who wants to access their account (User Authentication)
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
})


router.put("/:userId", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	userController.updateUser(req.params,req.body, userData.isAdmin).then(resultFromController => res.send(resultFromController))
})

router.get("/details", auth.verify, (req, res) => {
  const userId = auth.decode(req.headers.authorization).id // Access the user ID from the decoded token
  const userFirstName = auth.decode(req.headers.authorization).firstName
  const userLastName = auth.decode(req.headers.authorization).lastName
  userController.getProfile(userId, userFirstName, userLastName).then(resultFromController => res.send(resultFromController));
})


router.get("/:userId", (req, res) => {
	
	// Since the course ID will be sent via the URL, we cannot retrieve it from the request body
	//  We can however retrieve the course ID by accessing the request's "params" property which contains all parameters provided via the URL

	userController.retrieveUser(req.params).then(resultFromController => res.send(resultFromController));

})


// To change user as an admin
router.patch("/:userId/update", auth.verify, (req,res) => {
	const userData = auth.decode(req.headers.authorization);
	userController.updateUser(req.params, req.body, userData.isAdmin).then(
		resultFromController => res.send(resultFromController))
});



router.delete("/:userId", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  userController.deleteUser(req.params, userData.isAdmin).then((resultFromController) => {
    res.send(resultFromController);
  });
});










router.get("/registeredUser", auth.verify, (req,res) => {
	const userData = auth.decode(req.headers.authorization);
	console.log(userData)
	userController.getAllUser(userData.isAdmin).then(resultFromController => res.send(resultFromController))
});






module.exports = router;