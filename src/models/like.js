const mongoose = require("mongoose");

/**
 * Likes model schema.
 */
const likeSchema = new mongoose.Schema({
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
    },
    {timestamps: true}
);

module.exports = mongoose.model('Likes', likeSchema);