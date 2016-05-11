var Note = require('../models/note'),
    status = require('../config/status')
module.exports = {
    /**
     * 获取全部Note
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    list: function(req, res, next) {
        Note.findAll(function(err, notes) {
            if (err || !notes) {
                return res.send({ code: status.note_error.get_list_err })
            } else {
                res.send({ code: status.ok, notes: notes })
            }
        })
    },
    /**
     * 获取全部Readings
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    readings: function(req, res, next) {
        Note.findAllReadings(function(err, readings) {
            if (err || !readings) {
                return res.send({ code: status.note_error.get_list_err })
            } else {
                res.send({ code: status.ok, readings: readings })
            }
        })
    },

    /**
     * Fetch all travel
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    travels: function(req, res, next) {
        Note.findAllTravels(function(err, travels) {
            if (err || !travels) {
                return res.send({ code: status.note_error.get_list_err })
            } else {
                res.send({ code: status.ok, travels: travels })
            }
        })
    },

    /**
     * Add note
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    add: function(req, res, next) {
        console.log('note add')
        var new_note = new Note({
            title: req.body.title,
            content: req.body.content,
            author: req.body.signedCookies[config.sessionKey],
            type: req.body.type,
            address: req.body.address,
            tags: req.body.tags,
            spend: req.body.spend
        })
        console.log(new_note)
        new_note.save(function(err, note) {
            if (err || !note) {
                return res.send({
                 code: status.note_error.add_err,
                 message:'add' })
            } else {
                res.send({
                    code: status.ok,
                    note: note
                })
            }
        })
    },
    /**
     * Remove note
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    destroy: function(req, res, next) {
        res.send({
            code: status.ok
        })
    },
    /**
     * Edit note
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    update: function(req, res, next) {
        res.send({
            code: status.ok
        })
    },
    /**
     * Show single note
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    show: function(req, res, next) {
        Note.findById({
            _id: req.params.id
        }, function(err, note) {
            if (err || !note) {
                return res.send({ code: status.note_error.get__err })
            } else {
                console.log('data from server:')
                console.log(note)
                res.send({ code: status.ok, note: note })
            }
        })
    },
    /**
     * Star note
     * @param  {[type]}
     * @param  {[type]}
     * @param  {Function}
     * @return {[type]}
     */
    star: function(req, res, next) {
        var _id = req.body._id,
            name = req.body.name
        Note.start(_id, name, function(err) {
            if (err) {
                return res.send({
                    code: status.note_error.update_err
                })
            } else {
                res.send({
                    code: status.ok
                })
            }
        })
    }

}
