const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  _id: String,
  project_name: String,
  project_type: String,
  creator_id: String,
  // creation_date: Date, to be added later
  // project_completion_date: Date, add later
  picture: String, //url to where the picture is stored, add later
  location: {
    address: String,
    // latitude: String, let's add later
    // longitude: Strings
  }
});

// compile model from schema
module.exports = mongoose.model("project", ProjectSchema);
