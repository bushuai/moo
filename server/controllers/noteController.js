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
    create: function(req, res, next) {
        res.json({
            "msg": "create notes"
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
        res.json({
            "msg": "note delete"
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
        res.json({
            "msg": "note update"
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
            if (err || !travels) {
                return res.send({ code: status.note_error.get__err })
            } else {
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
    edit: function(req, res, next) {
        res.json({
            "msg": "notes edit"
        })
    },
    /**
     * 新建页面
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    new: function(req, res, next) {
        res.render('/note/new')
    },
    start: function(req, res, next) {
        var _id = req._id,
            name = req.name
        Note.start(_id, name, function(err) {
            if (err) {
                return res.send({
                    code: status.note_error.update_err
                })
            } else {
                return res.send({
                    code: status.ok
                })
            }
        })
    }
}
