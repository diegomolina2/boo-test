'use strict';

const express = require('express');
const router = express.Router();
const {
  GetAllAction,
  GetAction,
  CreateAction,
  UpdateAction,
  DeleteAction,
} = require('../controllers/commentController')

const BASE_API_PATH = "/api/comments"

/**
 * Return All
 */
router.get(BASE_API_PATH + "/", GetAllAction);

/**
 * Return by id
 */
router.get(BASE_API_PATH + "/:id", GetAction);

/**
 * Create new and return the ID
 */
router.post(BASE_API_PATH + "/", CreateAction);

/**
 * Edit by id
 */
router.patch(BASE_API_PATH + "/:id", UpdateAction);

/**
 * Delete by id
 */
router.delete(BASE_API_PATH + "/:id", DeleteAction);

module.exports = function() {
  return router;
}

