const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    result_id: String,
    emissions: Number
});

// compile model from schema
module.exports = mongoose.model("result", ResultSchema);