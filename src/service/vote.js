'use strict'

const Vote = require("../models/vote");
const Comment = require("../models/comment");
const { personalityTypeValidator, personalityValuesValidator} = require("../helpers/personalityValidator")

/**
 *
 @returns {Promise<unknown>}
 */
const getAll = async () => {

    try {
        return await Vote.find()
    } catch (e) {
        return 'Error: ' + e;
    }
}

/**
 *
 * @param id
 */
const get = async (id) => {

    if (!id) return

    try {
        return await Vote.findById(id)
    } catch (e) {
        return 'Error: ' + e;
    }
}

/**
 *
 * @param commentId
 */
const getByCommentId = async (commentId) => {

    if (!commentId) return

    try {
        return await Vote.find({
            commentId: commentId
        })
    } catch (e) {
        return 'Error: ' + e;
    }
}

 /**
 * @param body
 * @returns {Promise<unknown>}
 */
const create = async (body) => {

    if (!body) return

     if (!personalityTypeValidator(body.type)) {
         return 'Personality type is not valid';
     }
     const isValidPersonalityValue = await personalityValuesValidator(body.value, body.type)
     if (!isValidPersonalityValue) {
         return 'Personality value is not valid';
     }

    const alreadyVoted = await Vote.findOne(
        {
            userId: body.userId,
            commentId: body.commentId,
            value: body.value,
            type: body.type
        }
    ).exec();

    if (!alreadyVoted) {
        const vote = new Vote({
            userId: body.userId,
            commentId: body.commentId,
            value: body.value,
            type: body.type,
        })

        try {
            const savedVote = await vote.save();
            if (savedVote._id) {
                const commentToUpdate =  await Comment.findOne({_id: savedVote.commentId})
                if (commentToUpdate) {
                    commentToUpdate.votes.push(savedVote);
                    await commentToUpdate.save()
                    return savedVote._id;
                }
            }
        } catch (e) {
            return 'Error: ' + e;
        }
    }
}

/**
 *
 * @param id
 */
const deleteVote = async (id) => {

    if (!id) return

    try {
        const voteToDelete = await Vote.findById(id)
        if (voteToDelete) {
            const commentToUpdate =  await Comment.findOne({_id: voteToDelete.commentId})
            if (commentToUpdate) {
                let i = commentToUpdate.likes.findIndex(object => {
                    return object._id == id;
                });
                commentToUpdate.votes.splice(i, 1);
                await commentToUpdate.save();
                await Vote.deleteOne({ _id: voteToDelete._id});
                return true;
            }
        }
    } catch (e) {
        return 'Error: ' + e;
    }
}

module.exports = {
    getAll,
    get,
    getByCommentId,
    create,
    deleteVote
}
