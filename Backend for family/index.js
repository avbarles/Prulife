const express = require("express");
const mongoose = require("mongoose");


//  allows access to routes defined within in our application
const userRoutes = require("./routes/user");
const cors = require("cors");
const app = express();

// Creats an "app" variable that stores the result of the "express" function that initializes our express application



// connect to our MongoDB database



mongoose.connect("mongodb+srv://antonio-255:admin123@zuitt-bootcamp.wce9aon.mongodb.net/?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//   defines the "/users" string to be included for all user routes defined in the "user" route file
app.use("/users", userRoutes);
// defiens the /courses string to be included for all course routes defined in the course route file
// app.use("/courses", courseRoutes);



//  if(require.main) would allow us to listen to the app directly if it is not imported to another module, it will run the app directly
//  else, if it is needed to be imported, it will not run the app and instead export it to be used in another file
if(require.main === module){
	// Will used the defined port number for the application whenever an environment vaiable is available OR will use port 4000 if none is defined
	// This syntaax will allow felxibility when using the application locally or as a hosted application
	app.listen(process.env.PORT || 4000, () => {
		console.log(`API is now online on port ${process.env.PORT || 4000}`)
	});
}

module.exports = app;