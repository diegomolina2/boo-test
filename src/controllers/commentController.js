'use strict'

const commentService = require('../service/comment')

/**
 * Get All
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetAllAction = async (req, res) => {
    const response = await commentService.getAll(req);
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
    const response = await commentService.get(req.params.id);
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
    const response = await commentService.create(req.body);
    res.send(response);
}

/**
 * Update existing by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const UpdateAction = async (req, res) => {
    const response = await commentService.update(req.params.id,req.body);
    res.send(response);
}

/**
 * Delete existing by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const DeleteAction = async (req, res) => {
    const response = await commentService.deleteComment(req.params.id);
    res.send(response);
}

module.exports = {
    GetAllAction,
    GetAction,
    CreateAction,
    UpdateAction,
    DeleteAction,
}
