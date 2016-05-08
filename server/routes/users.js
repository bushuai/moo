var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    $ = require('../controllers/userController'),
    auth = require('../config/auth.js')

router.route('/')
    // /users GET 获取全部用户信息
    .get($.list)

router.route('/:id')
    .get($.show)
    // .post(auth.check, $.update)
    // /users/1001 DELETE 删除用户信息
    .delete(auth.check, $.destroy)

// /users/new GET 渲染注册页面
router.route('/signup')
    .post($.create)

// /users/new GET 渲染登录页面
router.route('/signin')
    .post($.validate)

// /users/1001/edit GET 渲染编辑页面
router.get('/:id/edit', auth.check, $.edit)

module.exports = router
