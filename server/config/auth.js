var status = require('./status'),
    User = require('../models/user'),
    config = require('../config/config')

exports.check = function(req, res, next) {
    if (res.locals.isAutherized) {
        next()
    } else {
        res.send({ code: status.error.permission_deny })
    }
}

exports.authorize = function(req, res, next) {
    var uid = req.cookies['uid'],
        xid = req.signedCookies[config.sessionKey]

    console.log('uid ====' + uid)
    console.log('xid ==== ' + xid)

    if (uid) {
        User.findByLoginId(uid, function(err, user) {
            if (err || !user) {
                res.locals.isAuthorized = false
                next()
                return
            }
            res.locals.user = user
            req.user = res.locals.user
            res.locals.isAuthorized = true
            next()
        })
    } else {
        res.locals.isAuthorized = false
        next();
    }

}
