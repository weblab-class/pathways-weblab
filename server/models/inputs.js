const mongoose = require("mongoose");

const InputSchema = new mongoose.Schema({
    input_id: String,
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
});

// compile model from schema
module.exports = mongoose.model("input", InputSchema);