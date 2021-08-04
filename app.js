/*
* Importing and setting up modules
*/
// Import the Express module
const express = require("express");
//Create an Express application
const app = express()
// Set up view engine
app.set("views engine", "pug");


/*
* Adding Middlewares
*/
// Use the built-in json parser in Express
app.use(express.json());
// Use the built-in urlencoded payload parser in Express to parse with querystring library
app.use(express.urlencoded({extended: false}));





// Assign a port for the express server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  })