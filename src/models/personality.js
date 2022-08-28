const mongoose = require("mongoose");

/**
 * Personalities model schema.
 */
const personalitiesSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true, unique: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model('Personalities', personalitiesSchema);