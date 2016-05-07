var express = require('express'),
    router = express.Router(),
    Note = require('../models/note'),
    $ = require('../controllers/noteController')

router.route('/')
    .get($.list)
    .post($.create)
    
router.route('/:id')
    .get($.show)
    .put($.update)
    .delete($.destroy)


router.get('/:id/edit', $.edit)
router.route('/readings')
    .get($.readings)

router.route('/travels')
    .get($.travels)

router.get('/new', $.new)



module.exports = router
