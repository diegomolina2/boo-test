'use strict';

const express = require('express');
const router = express.Router();
const {
  GetAllAction,
  GetAction,
  GetByCommentIdAction,
  CreateAction,
  DeleteAction,
} = require('../controllers/likeController')

const BASE_API_PATH = "/api/like"

/**
 * Return All
 */
router.get(BASE_API_PATH + "/", GetAllAction);

/**
 * Return by id
 */
router.get(BASE_API_PATH + "/:id", GetAction);

/**
 * Return by comment id
 */
router.get(BASE_API_PATH + "/comment" + "/:id", GetByCommentIdAction);

/**
 * Create new and return the ID
 */
router.post(BASE_API_PATH + "/", CreateAction);

/**
 * Delete by id
 */
router.delete(BASE_API_PATH + "/:id", DeleteAction);

module.exports = function() {
  return router;
}

