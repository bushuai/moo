var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    $ = require('../controllers/userController'),
    auth = require('../config/auth.js')

router.route('/')
    .get($.list)

router.route('/signup')
    .post($.create)

router.route('/signin')
    .post($.validate)

router.route('/posts')
    .get($.posts)

router.route('/:id')
    .get($.show)
    .delete(auth.check, $.destroy)

router.route('/:id/edit')
    .post(auth.check, $.update)

module.exports = router
