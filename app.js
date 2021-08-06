/*
* Importing and setting up modules
*/
// Import the Express module
const express = require("express");
const { render } = require("pug");
//Create an Express application
const app = express()
// Require project data from "data.json"
const { projects } = require("./data.json");
// Require personal data from "data.json"
const { personal } = require("./data.json");


/*
* Adding Middlewares
*/
// Set up a template engine to transform pug/jade templates into HTML files
app.set("view engine", "pug");
// Use the built-in json parser in Express
app.use(express.json());
// Use the built-in urlencoded payload parser in Express to parse with querystring library
app.use(express.urlencoded({extended: false}));
// Serve the static files
app.use("/static", express.static("public"));


/*
* Rendering pug templates (Handling of "GET" requests from client)
*/
// Render the "home" page
app.get("/", (req, res) => {
    res.render("index", {projects});
});

// Render the "about" page
app.get("/about", (req, res) => {
    res.render("about", {personal});
});

// If the a get request with "/error" is requested, construct a new error object and pass it to next error handler
app.get("/error", (req, res, next) => {
    const err = new Error();
    err.message = "Internal Server Error"
    err.status = 500;
    next(err);    
});

// Render the "project" page
app.get("/project/:id", (req, res, next) => {
    const projectNum = +req.params.id;

    if(projects[projectNum]) {
        const project = projects[projectNum];
        res.render("project", {project});
    }
    else {
        console.log();
        const err = new Error();
        err.status = 404;
        err.message = "Page not found"
        next(err);
    }
});


/*
* Error handling
*/
// If get requests can't be fulfilled. Create the error 404 and pass it to the next error handler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Page not found"
    next(err);
})

// Error handler
app.use((err, req, res, next) => {
    if (err.status === 404) {
        console.log(`${err.message} (${err.status})`);
        // Render the "page-not-found" template
        res.render("page-not-found", {err});
    }

    if(err.status === 500) {
        console.log('Custom error route called:', `${err.message} (${err.status})`);
        // Render the custom error template
        res.render("error", {err})
    }
})


/*
* Assign a port for the Express server
*/
app.listen(3001, () => {
    console.log('Server listening on port 3000');
  });