var status = require('./status'),
    User = require('../models/user'),
    config = require('../config/config')

exports.check = function(req, res, next) {
    console.log(res.locals.isAutherized)
    if (res.locals.isAutherized) {
        console.log('check passed')
        next()
    } else {
        console.log('check failed')
        res.send({ code: status.error.permission_deny, 'message': 'please signin.' })
    }
}

exports.authorize = function(req, res, next) {
    var uid = req.cookies['uid'],
        xid = req.signedCookies[config.sessionKey]

    if (xid) {
        User.findById(xid, function(err, user) {
            if (err || !user) {
                res.locals.isAutherized = false
                next()
                return
            }
            console.log('authorized')
            res.locals.user = user
            req.user = res.locals.user
            res.locals.isAutherized = true
            next()
        })
    } else {
        res.locals.isAutherized = false
        next();
    }

}
