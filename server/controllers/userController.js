var User = require('../models/user'),
    Note = require('../models/note'),
    excrypt = require('../config/encrypt'),
    status = require('../config/status'),
    config = require('../config/config')

module.exports = {
    /**
     * Fetch all user
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    list: function(req, res, next) {
        var users = User.findAll(function(err, users) {
            res.json(users)
        })
    },
    /**
     * regist user
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    create: function(req, res, next) {
        console.log('user create method get requrest')
        console.log(req.body)
        var reg_user = new User({
            loginId: req.body.loginId,
            password: excrypt(req.body.password),
            email: req.body.email
        })

        User.findByLoginId(reg_user.loginId, function(err, user) {
            if (!user) {
                reg_user.save(function(err, user) {
                    console.log('reg_user is ');
                    console.log(user);
                    console.log(!user)
                    console.log('err is')
                    console.log(err)
                    if (err || !user) {
                        console.log('user reg failed')
                        return res.send({
                            code: status.user_error.invalid_user
                        })
                    } else {
                        console.log('user reg success')
                        res.send({
                            code: status.ok,
                            user: user
                        })
                    }
                })
            } else {
                res.send({ code: status.user_error.name_exists })
            }
        })

    },
    /**
     * Remove user account
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    destroy: function(req, res, next) {
        var _id = req.body._id
        User.deleteById(_id, function(err) {
            if (err) {
                return res.send({
                    code: status.error.server_error
                })
            } else {
                res.send({
                    code: status.ok
                })
            }
        })
    },
    /**
     * Edit user profile
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    update: function(req, res, next) {
        var _id = req.body._id,
            fields = {
                password: req.body.password,
                name: req.body.name,
                address: req.body.address,
                gender: req.body.gender,
                phone: req.body.phone,
                tags: req.body.tags
            }
        User.update(_id, fields, function(err, user) {
            if (err || !user) {
                return res.send({
                    code: status.user_error.update_error,
                    user: user
                })
            } else {
                res.send({
                    code: status.ok
                })
            }
        })

    },
    /**
     * Show user info
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    show: function(req, res, next) {
        console.log('show user profile xxx')
        console.log('show user profile ' + req.params.id)
        User.findById(req.params.id, function(err, user) {
            if (err || !user) {
                return res.send({
                    code: status.user_error.get_user_err,
                    message: 'show user profile failed'
                })
            } else {
                return res.send({
                    code: status.ok,
                    user: user
                })
            }
        })
    },

    /**
     * Validate 
     * @param  {[type]}
     * @param  {[type]}
     * @param  {Function}
     * @return {[type]}
     */
    validate: function(req, res, next) {
        var loginId = req.body.loginId,
            password = req.body.password

        User.findByLoginId(loginId, function(err, user) {
            if (err || !user) {
                return res.send({
                    code: status.user_error.get_user_err,
                    message: 'validate failed'
                })
            }
            if (user.validPassword(password)) {
                console.log(user)

                res.clearCookie(config.sessionKey, { path: '/' });
                res.cookie(config.sessionKey, user._id, {
                    path: '/',
                    signed: true
                })

                res.locals.isAuthorized = true
                res.cookie('uid', user._id, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                })

                return res.send({
                    code: status.ok,
                    user: user
                })

            } else {
                return res.send({ code: status.user_error.invalid_password })
            }
        })
    },
    posts: function(req, res, next) {
        console.log('users posts user _id')
        console.log(req.user._id)
        Note.findByAuthor(req.user._id, function(err, posts) {
            if (err || !posts) {
                res.send({
                    code: status.note_error.get__err,
                    message: 'get user posts failed'
                })
            } else {
                res.send({
                    code: status.ok,
                    posts: posts
                })
            }
        })
    }
}
