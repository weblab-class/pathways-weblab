const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    project_id: String,
    creator_id: String,
    total_emissions: Number,
    concrete_emissions: Number,
    glass_emissions: Number,
    steel_emissions: Number,
    timber_emissions: Number,

});

// compile model from schema
module.exports = mongoose.model("result", ResultSchema);