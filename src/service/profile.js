'use strict'

const Profile = require("../models/profile");
const {sortValidator} = require("../helpers/sortValidator");

/**
 *
 @returns {Promise<unknown>}
 */
const getAll = async (req) => {

    let sort = sortValidator(req.query.sort) ? req.query.sort : 'asc';
    try {
        return await Profile.find().sort({createdAt: sort})
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
        return await Profile.findById(id)
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

    const profile = new Profile({
        name: body.name,
        description: body.description,
        mbti: body.mbti,
        enneagram: body.enneagram,
        variant: body.variant,
        tritype: body.tritype,
        socionics: body.socionics,
        sloan: body.sloan,
        psyche: body.psyche,
        image: body.image,
    })

    try {
        const result = await profile.save()
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
        const [profile] = await Promise.all([Profile.findById(id)])
        if (body.name) profile.name = body.name;
        if (body.description) profile.description = body.description;
        if (body.mbti) profile.mbti = body.mbti;
        if (body.enneagram) profile.enneagram = body.enneagram;
        if (body.variant) profile.variant = body.variant;
        if (body.tritype) profile.tritype = body.tritype;
        if (body.socionics) profile.socionics = body.socionics;
        if (body.sloan) profile.sloan = body.sloan;
        if (body.psyche) profile.psyche = body.psyche;
        if (body.image) profile.image = body.image;

        return await profile.save();
    } catch (e) {
        return 'Error: ' + e;
    }
}

/**
 *
 * @param id
 */
const deleteProfile = async (id) => {

    if (!id) return

    try {
        await Profile.findByIdAndDelete(id)
    } catch (e) {
        return 'Error: ' + e;
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteProfile
}
