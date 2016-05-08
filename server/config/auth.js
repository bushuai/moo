var status = require('./status'),
    User = require('../models/user'),
    config = require('../config/config')

exports.check = function(req, res, next) {
    console.log(req)
    if (res.locals.isAutherized) {
        next()
    } else {
        res.send({ code: status.error.permission_deny })
    }
}

exports.authorize = function(req, res, next) {
    console.log(req.cookies)
    var uid = req.cookies['uid']

    console.log(uid)

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
