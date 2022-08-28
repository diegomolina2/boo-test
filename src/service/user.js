'use strict'

const User = require("../models/user");
const {sortValidator} = require("../helpers/sortValidator");

/**
 *
 @returns {Promise<unknown>}
 */
const getAll = async (req) => {

    let sort = sortValidator(req.query.sort) ? req.query.sort : 'asc';
    try {
        return await User.find().sort({createdAt: sort}).populate('comments').exec();
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
        return await User.findById(id)
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

    const user = new User({
        name: body.name,
    })

    try {
        const result = await user.save()
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
        const [user] = await Promise.all([User.findById(id)])
        if (body.name) user.name = body.name;

        return await user.save();
    } catch (e) {
        return 'Error: ' + e;
    }
}

/**
 *
 * @param id
 */
const deleteUser = async (id) => {

    if (!id) return

    try {
        await User.findByIdAndDelete(id)
    } catch (e) {
        return 'Error: ' + e;
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteUser
}
