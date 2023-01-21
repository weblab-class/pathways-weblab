const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  project_id: String,
  project_name: String,
  project_type: String,
  creator_id: String,
  location: {
    address: String,
    latitude: String,
    longitude: String
  },
  inputs: {
    materials: {
      concrete: {
        quantity: Number,
        unit: String
      },
      steel: {
        quantity: Number,
        unit: String
      }
    }
  },
  results: {
  }
});

// compile model from schema
module.exports = mongoose.model("project", ProjectSchema);
