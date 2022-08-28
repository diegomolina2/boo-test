'use strict'
const Personality = require('../models/personality');

exports.personalityTypeValidator = (value) => {
    const allowedPersonalityTypes = ['mbti', 'enneagram', 'zodiac'];

    return allowedPersonalityTypes.includes(value.toLowerCase());
}

exports.personalityValuesValidator = async (value, type) => {
    const allowedValues = await Personality.find({type: type, name: value});

    return allowedValues.length;
}