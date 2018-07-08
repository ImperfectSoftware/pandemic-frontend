'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_URL: '"http://localhost:3000"',
  WEBSOCKET_URL: '"ws://localhost:28080"',
  NODE_ENV: '"development"'
})
