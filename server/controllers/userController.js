var User = require('../models/user'),
    excrypt = require('../config/encrypt'),
    status = require('../config/status')

module.exports = {
    /**
     * 获取全部用户
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
     * 新建用户（注册）
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
                    if (err || !user) {
                        return res.send({
                            code: status.user_error.invalid_user
                        })
                    } else {
                        res.send({
                            code: status.ok
                        })
                    }
                })
            } else {
                res.send({ code: status.user_error.name_exists })
            }
        })

    },
    /**
     * 删除用户
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
     * 更新用户信息
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
                    code: status.user_error.update_error
                })
            } else {
                res.send({
                    code: status.ok
                })
            }
        })

    },
    /**
     * 显示用户信息
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    show: function(req, res, next) {
        User.findByLoginId(req.params.id, function(err, user) {
            if (err || !user) {
                return res.json({
                    code: status.user_error.get_user_err
                })
            } else {
                res.send({
                    code: status.ok,
                    data: user
                })
            }
        })
    },
    /**
     * 编辑用户信息
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    edit: function(req, res, next) {
        res.json({
            "msg": "should redirect to edit page"
        })
    },
    /**
     * 渲染注册页面
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    new: function(req, res, next) {
        res.render('user/signup')
    },
    /**
     * 渲染登录页面
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    login: function(req, res, next) {
        res.render('user/signin')
    },
    /**
     * 验证登录
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    validate: function(req, res, next) {
        var loginId = req.body.loginId,
            password = req.body.password

        User.findByLoginId(loginId, function(err, user) {
            if (err || !user) {
                return res.send({ code: status.user_error.get_user_err })
            }
            if (user.validPassword(password)) {
                return res.send({ code: status.ok, data: user })
            } else {
                return res.send({ code: status.user_error.invalid_password })
            }
        })
    },
    /**
     * 注销用户
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    logout: function(req, res, next) {
        res.json({
            "msg": "user logout"
        })
    },
}
