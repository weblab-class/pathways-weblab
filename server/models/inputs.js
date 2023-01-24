const mongoose = require("mongoose");

const InputSchema = new mongoose.Schema({
    project_id: String,
    creator_id: String,
    materials: {
        concrete: {
            quantity: String,
            unit: String
        },
        steel: {
            quantity: String,
            unit: String,
        },
        timber: {
            quantity: String,
            unit: String,
        },
        glass: {
            quantity: String,
            unit: String,
        }
    }
});

// compile model from schema
module.exports = mongoose.model("input", InputSchema);