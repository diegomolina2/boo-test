'use strict'

const likeService = require('../service/like')

/**
 * Get All
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetAllAction = async (req, res) => {
    const response = await likeService.getAll();
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
    const response = await likeService.get(req.params.id);
    res.send(response);
}

/**
 * Get by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetByCommentIdAction = async (req, res) => {
    const response = await likeService.getByCommentId(req.params.id);
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
    const response = await likeService.create(req.body);
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
    const response = await likeService.deleteLike(req.params.id);
    res.send(response);
}

module.exports = {
    GetAllAction,
    GetAction,
    GetByCommentIdAction,
    CreateAction,
    DeleteAction,
}
