'use strict'

const nconf = require('nconf')

nconf.argv().env('__')

nconf.defaults(require(`./default.json`))

module.exports = nconf
