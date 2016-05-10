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
                res.send({ code: status.ok, data: notes })
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
                res.send({ code: status.ok, data: readings })
            }
        })
    },

    /**
     * 获取全部Travels
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
                res.send({ code: status.ok, data: travels })
            }
        })
    },

    /**
     * 新建Note
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
            spend: req.body.spend
        })
        console.log(new_note)
        new_note.save(function(err, note) {
            if (err || !note) {
                return res.send({ code: status.note_error.add_err })
            } else {
                res.send({
                    code: status.ok,
                    note: note
                })
            }
        })
    },
    /**
     * 删除Note
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
     * 更新Note
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
     * 显示某个Note
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
                res.send({ code: status.ok, data: note })
            }
        })
    },
    /**
     * 编辑Note
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    // edit: function(req, res, next) {
    //      res.send({
    //         code:status.ok
    //     })
    // },
    /**
     * 新建页面
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    // new: function(req, res, next) {
    //     res.render('/note/new')
    // },
    star: function(req, res, next) {
        var _id = req._id,
            name = req.name
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
