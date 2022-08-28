const mongoose = require("mongoose");

/**
 * Vote model schema.
 */
const voteSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
            required: true
        },
        type: {type: String, required: true},
        value: {type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model('Votes', voteSchema);