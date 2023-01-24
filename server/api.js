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


// Get my projects
router.get("/projects", (req, res) => {
  try {
    const creator_id_var = req.query.creator_id;
    Project.find({ creator_id: creator_id_var }).then((projects) => res.send(projects));
  } catch (error) {
    console.log(error)
  };
}
);

// Get specific project information
router.get("/project", (req, res) => {
  try {
    const project_id_var = req.query.project_id;
    Project.find({ _id: project_id_var }).then((project) => res.send(project));
  } catch (error) {
    console.log(error)
  };
}
);

// Get specific project information
router.get("/inputs", (req, res) => {
  try {
    const project_id_var = req.query.project_id;
    Input.find({ _id: project_id_var }).then((input) => res.send(input));
  } catch (error) {
    console.log(error)
  };
}
);

// Create a new project
router.post("/project", (req, res) => {
  // try {
  const newProject = new Project({
    project_name: req.body.project_name,
    project_type: req.body.project_type,
    picture: req.body.picture,
    creator_id: req.user._id,
    location: {
      city: req.body.location.city,
      country: req.body.location.country
    }
  });
  newProject.save().then((project) => res.send(project));
  // } catch (error) {
  //   console.log(error);
  // };
}
);

// Create a new input
router.post("/inputs", (req, res) => {
  try {
    const newInput = new Input({
      project_id: req.body.project_id,
      creator_id: req.body.creator_id,
      materials: {
        concrete: {
          quantity: req.body.materials.concrete.quantity,
          unit: req.body.materials.concrete.unit
        },
        steel: {
          quantity: req.body.materials.steel.quantity,
          unit: req.body.materials.steel.unit
        },
        timber: {
          quantity: req.body.materials.timber.quantity,
          unit: req.body.materials.timber.unit
        },
        glass: {
          quantity: req.body.materials.glass.quantity,
          unit: req.body.materials.glass.unit
        }
      }
    });
    newInput.save().then((input) => res.send(input));
  } catch (error) {
    console.log(error);
  };
}
);

// Create a new input
router.post("/inputs", (req, res) => {
  try {
    const newInput = new Input({
      project_id: req.body.project_id,
      creator_id: req.body.creator_id,
      materials: {
        concrete: {
          quantity: req.body.materials.concrete.quantity,
          unit: req.body.materials.concrete.unit
        },
        steel: {
          quantity: req.body.materials.steel.quantity,
          unit: req.body.materials.steel.unit
        },
        timber: {
          quantity: req.body.materials.timber.quantity,
          unit: req.body.materials.timber.unit
        },
        glass: {
          quantity: req.body.materials.glass.quantity,
          unit: req.body.materials.glass.unit
        }
      }
    });
    newInput.save().then((input) => res.send(input));
  } catch (error) {
    console.log(error);
  };
}
);


// Get specific project information
router.get("/results", (req, res) => {
  try {
    const project_id_var = req.query.project_id
    Result.find({ _id: project_id_var }).then((result) => res.send(result));
  } catch (error) {
    console.log(error)
  };
}
);

// Create a new result
router.post("/results", (req, res) => {
  // try {
  const newResult = new Result({
    project_id: req.body.project_id,
    creator_id: req.body.creator_id,
    project_name: req.body.project_name,
    total_emissions: req.body.total_emissions,
    concrete_emissions: req.body.concrete_emissions,
    glass_emissions: req.body.glass_emissions,
    steel_emissions: req.body.steel_emissions,
    timber_emissions: req.body.timber_emissions,
  });
  newResult.save().then((result) => res.send(result));
  // } catch (error) {
  //   console.log(error);
  // };
}
);

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});
// Input data into a project




module.exports = router;