'use strict'

const Personality = require('../models/personality');
const db = require('../database');
const Data = require('./data.json');

db.createConnection();

/**
 * Migrate all personality fields
 */
(async () => {
    try {
        await Personality.create(Data.personality)
        console.log('Data migrate successfully');
    } catch (e) {
        throw e
    }
    db.disconnectConnection();
})();

