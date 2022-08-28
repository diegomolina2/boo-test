'use strict'

const userService = require('../service/user')

/**
 * Get All
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetAllAction = async (req, res) => {
    const response = await userService.getAll(req);
    res.send(response);
}

/**
 * Get by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetAction = async (req, res) => {
    const response = await userService.get(req.params.id);
    res.send(response);
}

/**
 * Create new
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const CreateAction = async (req, res) => {
    const response = await userService.create(req.body);
    res.send(response);
}

/**
 * Update by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const UpdateAction = async (req, res) => {
    const response = await userService.update(req.params.id,req.body);
    res.send(response);
}

/**
 * Delete by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const DeleteAction = async (req, res) => {
    const response = await userService.deleteUser(req.params.id);
    res.send(response);
}

module.exports = {
    GetAllAction,
    GetAction,
    CreateAction,
    UpdateAction,
    DeleteAction,
    // RenderAction
}
