var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    $ = require('../controllers/userController')

router.route('/')
    // /users GET 获取全部用户信息
    .get($.list)

// /users/new GET 渲染注册页面
router.route('/signup')
    .get($.new)
    .post($.create)

// /users/new GET 渲染登录页面
router.route('/signin')
    .get($.login)
    .post($.validate)

router.route('/:id')
    // /users/1001 GET 显示用户信息
    .get($.show)
    // /users/1001 PUT 更新用户信息
    .put($.update)
    // /users/1001 DELETE 删除用户信息
    .delete($.destroy)

// /users/1001/edit GET 渲染编辑页面
router.get('/:id/edit', $.edit)

module.exports = router
