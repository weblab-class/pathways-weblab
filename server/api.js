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

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/projects", (req, res) => {
  // empty selector means get all documents
  Project.find({}).then((projects) => res.send(projects));
});

router.post("/project", auth.ensureLoggedIn, (req, res) => {
  const newProject = new Project({
    creator_id: req.user.creator_id,
    creator_name: req.user.name,
    project_id: req.user.project_id,
    project_name: req.user.project_name,
    creation_date: req.user.Date,
    project_completion_date: req.user.Date,
    picture: req.user.picture,
    location: req.user.location,
    inputs: req.user.inputs,
    results: req.user.results,
  });

  newProject.save().then((project) => res.send(project));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
