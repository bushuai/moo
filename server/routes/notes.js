var express = require('express'),
    router = express.Router(),
    Note = require('../models/note'),
    $ = require('../controllers/noteController'),
    auth = require('../config/auth')

router.route('/')
    .get($.list)
    .post(auth.check,$.create)
    
router.route('/:id')
    .get($.show)
    .post(auth.check,$.update)
    .delete(auth.check,$.destroy)

router.get('/:id/edit', $.edit)
router.route('/readings')
    .get($.readings)

router.route('/travels')
    .get($.travels)

router.get('/new',auth.check, $.new)


module.exports = router
