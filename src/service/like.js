'use strict'

const Like = require("../models/like");
const Comment = require("../models/comment");

/**
 *
 @returns {Promise<unknown>}
 */
const getAll = async () => {

    try {
        return await Like.find()
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
        return await Like.findById(id)
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
        return await Like.find({
            commentId: commentId
        })
    } catch (e) {
        return 'Error: ' + e;
    }
}

/**
 *
 * @param body
 * @returns {Promise<unknown>}
 */
const create = async (body) => {

    if (!body) return

    const alreadyLike = await Like.findOne(
        {
            userId: body.userId,
            commentId: body.commentId
        }
    ).exec();

    if (!alreadyLike) {
        const like = new Like({
            userId: body.userId,
            commentId: body.commentId,
        })

        try {
            const savedLike = await like.save();
            if (savedLike._id) {
               const commentToUpdate =  await Comment.findOne({_id: savedLike.commentId})
                if (commentToUpdate) {
                    commentToUpdate.likes.push(savedLike);
                    await commentToUpdate.save()
                    return savedLike._id;
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
const deleteLike = async (id) => {

    if (!id) return

    try {
        const likeToDelete = await Like.findById(id)
        if (likeToDelete) {
            const commentToUpdate =  await Comment.findOne({_id: likeToDelete.commentId})
            if (commentToUpdate) {
                let i = commentToUpdate.likes.findIndex(object => {
                    return object._id == id;
                });
                commentToUpdate.likes.splice(i, 1);
                await commentToUpdate.save();
                await likeToDelete.save();
                await Like.deleteOne({ _id: likeToDelete._id});
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
    deleteLike
}
