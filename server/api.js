/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Project = require("./models/project");
const Input = require("./models/inputs");
const Result = require("./models/results");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

// Get all projects
router.get("/projects", (req, res) => {
  try {
    Project.find({}).then((projects) => res.send(projects));
  } catch (error) {
    console.log(error)
  };
}
);

// Get specific project information
router.get("/project", (req, res) => {
  try {
    Project.find({ project_id: req.query._id }).then((project) => res.send(project));
  } catch (error) {
    console.log(error)
  };
}
);

// Create a new project
router.post("project", (req, res) => {
  try {
    const newProject = new Project({
      project_name: req.body.project_name,
      project_type: req.body.project_type,
      picture: req.body.picture,
      creator_id: req.user._id,
      location: {
        address: req.body.location.address,
      }
    });
  } catch (error) {
    console.log(error);
  };
}
);



// Input data into a project




module.exports = router;