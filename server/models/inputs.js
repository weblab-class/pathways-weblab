const mongoose = require("mongoose");

const InputSchema = new mongoose.Schema({
    project_id: String,
    creator_id: String,
    materials: {
        concrete: {
            quantity: Number,
            unit: String
        },
        steel: {
            quantity: Number,
            unit: String
        },
        timber: {
            quantity: Number,
            unit: String
        },
        glass: {
            quantity: Number,
            unit: String
        },
    }
    
})

// compile model from schema
module.exports = mongoose.model("input", InputSchema);