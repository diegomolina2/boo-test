'use strict'

const voteService = require('../service/vote')

/**
 * Get All
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const GetAllAction = async (req, res) => {
    const response = await voteService.getAll();
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
    const response = await voteService.get(req.params.id);
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
    const response = await voteService.getByCommentId(req.params.id);
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
    const response = await voteService.create(req.body);
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
    const response = await voteService.deleteVote(req.params.id);
    res.send(response);
}

module.exports = {
    GetAllAction,
    GetAction,
    GetByCommentIdAction,
    CreateAction,
    DeleteAction,
}
