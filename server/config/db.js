var mongoose = require('mongoose'),
    config = require('./config')

mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.db)

module.exports = mongoose
