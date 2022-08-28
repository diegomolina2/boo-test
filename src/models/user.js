const mongoose = require('mongoose');

/**
 * User model schema.
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    comments:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);