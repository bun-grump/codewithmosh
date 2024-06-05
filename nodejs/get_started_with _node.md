# check node version

node -- version

# if haven't install node, go to nodejs.org

# then run

node app.js

# scan js code errors

jshint app.js

# export object

module.exports.log = log

# export a single function

module.exports = log

# import module

const logger = require('./logger'); # use './logger' for current folder, './subfolder/logger' for child folders and '../logger' for parent folder
logger.log('message')
