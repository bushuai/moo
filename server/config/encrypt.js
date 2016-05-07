var crypto = require('crypto'),
    config = require('./config')

module.exports = function(str, secret) {
    return crypto.createHash(config.encryptType).update(str).digest('hex')
}
