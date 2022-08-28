'use strict'

const profileService = require('../service/profile')

/**
 * Get All profiles
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetAllAction = async (req, res) => {
    const response = await profileService.getAll(req);
    res.send(response);
}

/**
 * Get Profile by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetAction = async (req, res) => {
    const response = await profileService.get(req.params.id);
    res.send(response);
}

/**
 * Create new Profile
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const CreateAction = async (req, res) => {
    const response = await profileService.create(req.body);
    res.send(response);
}

/**
 * Update existing profile by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const UpdateAction = async (req, res) => {
    const response = await profileService.update(req.params.id,req.body);
    res.send(response);
}

/**
 * Delete existing profile by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const DeleteAction = async (req, res) => {
    const response = await profileService.deleteProfile(req.params.id);
    res.send(response);
}

/**
 * Render profile by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const RenderAction = async (req, res) => {
    const profile = await profileService.get(req.params.id);
    try {
        res.render('profile_template', {
            profile,
        });
    } catch (e) {
        res.send ('Error: ' + e)
    }
}

module.exports = {
    GetAllAction,
    GetAction,
    CreateAction,
    UpdateAction,
    DeleteAction,
    RenderAction
}
