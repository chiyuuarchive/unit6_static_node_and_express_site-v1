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

// Render the "error" page
app.get("/error", (req, res) => {
    // Log out custom error handler indication
    console.log('Custom error route called');

    // Construct a new error object
    const err = new Error();
    err.message = "Internal Server Error"
    err.status = 500;
    console.log(err.message);
    res.render("error", {err})
});

// Render the "project" page
app.get("/project/:id", (req, res, next) => {
    const projectNum = +req.params.id;

    if(projects[projectNum]) {
        console.log("A project object is being passed to the project.pug");
        const project = projects[projectNum];
        res.render("project", {project});
    }
    else {
        console.log("There is no project with this id");
        const err = new Error();
        err.status = 404;
        err.message = "Page not found"
        next(err);
    }
});


/*
* Error handling
*/
// Render the "page-not-found" page (404 Error handling)
app.use((err, req, res, next) => {
    console.log(err.message);
    res.render("page-not-found", {err});
})

// If undefined URL links are requested, render the "page-not-found" template.
app.get("/:id", (req, res, next) => {
    const input = req.params.id;
    if(/.+/.test(input)) {
        const err = new Error();
        err.status = 404;
        err.message = "Page not found"
        res.render("page-not-found", {err});

        // If the URL contains "noroute", print the err.message
        if(req.params.id==="noroute") {
            console.log(err.message);
        }
    }
})


/*
* Assign a port for the Express server
*/
app.listen(3001, () => {
    console.log('Server listening on port 3000');
  });