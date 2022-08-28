'use strict'

const Comment = require("../models/comment");
const Like = require("../models/like");
const { sortValidator } = require('../helpers/sortValidator')
const { personalityTypeValidator } = require('../helpers/personalityValidator')

/**
 *
 @returns {Promise<unknown>}
 */
const getAll = async (req) => {

    let sort = sortValidator(req.query.sort) ? req.query.sort : 'asc';

    let sortByLikes = sortValidator(req.query.likes) ? req.query.likes : 'asc';

    let personality = 'all';
    if (req.query.personality) {
        personality = personalityTypeValidator(req.query.personality) ? req.query.personality : 'all';
    }
    try {
        if (personality === 'all') {
            if (sortByLikes) {
                return await Comment.find().sort({likes: sortByLikes}).exec();
            }

            return await Comment.find().sort({createdAt: sort}).exec();
        } else {
            if (sortByLikes) {
                return await Comment.find(
                    {
                        personalityType: personality
                    }
                ).sort({likes: sortByLikes}).populate('likes').exec();
            }
            return await Comment.find(
                {
                    personalityType: personality
                }
            ).sort({createdAt: sort}).populate('likes').exec();
        }
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
        const comment = await Comment.findById(id);
        if (comment.length) comment.likes = await Like.find({'commentId' : id})
        return comment;
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

    const comment = new Comment({
        creator: body.creator,
        title: body.title,
        description: body.description,
        likes: body.likes,
        personalityType: body.personalityType
    })

    try {
        const result = await comment.save()
        return result._id;
    } catch (e) {
        return 'Error: ' + e;
    }
}

/**
 *
 * @param id
 * @param body
 * @returns {Promise<unknown>}
 */
const update = async (id, body) => {

    if (!id || !body) return

    try {
        const [comment] = await Promise.all([Comment.findById(id)])
        if (body.title) comment.title = body.title;
        if (body.description) comment.description = body.description;

        return await comment.save();
    } catch (e) {
        return 'Error: ' + e;
    }
}

/**
 *
 * @param id
 */
const deleteComment = async (id) => {

    if (!id) return

    try {
        await Comment.findByIdAndDelete(id)
    } catch (e) {
        return 'Error: ' + e;
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteComment
}
