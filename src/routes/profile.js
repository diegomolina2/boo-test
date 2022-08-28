'use strict';

const express = require('express');
const router = express.Router();
const {
  GetAllAction,
  GetAction,
  CreateAction,
  UpdateAction,
  DeleteAction,
  RenderAction,
} = require('../controllers/profileController')

const BASE_API_PATH = "/api/profiles"
const BASE_VIEW_PATH = "/profiles"

/**
 * Return All Profiles
 */
router.get(BASE_API_PATH + "/", GetAllAction);

/**
 * Return Profile by id
 */
router.get(BASE_API_PATH + "/:id", GetAction);

/**
 * Create new profile and return the ID
 */
router.post(BASE_API_PATH + "/", CreateAction);

/**
 * Edit Profile by id
 */
router.patch(BASE_API_PATH + "/:id", UpdateAction);

/**
 * Delete Profile by id
 */
router.delete(BASE_API_PATH + "/:id", DeleteAction);

/**
 * Render Profile by id
 */
router.get(BASE_VIEW_PATH + "/:id", RenderAction);

module.exports = function() {
  return router;
}

