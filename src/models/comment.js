const mongoose = require("mongoose");

/**
 * Comments model schema.
 */
const commentsSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Array },
    personalityType: { type: String, required: true },
    votes: { type: Array }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Comments', commentsSchema);