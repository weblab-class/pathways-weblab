const mongoose = require("mongoose");

const InputSchema = new mongoose.Schema({
    project_id: String,
    creator_id: String,
    concrete_quantity: String,
    concrete_unit: String,
    steel_quantity: String,
    steel_unit: String,
    timber_quantity: String,
    timber_unit: String,
    glass_quantity: String,
    glass_unit: String,
})

// compile model from schema
module.exports = mongoose.model("input", InputSchema);