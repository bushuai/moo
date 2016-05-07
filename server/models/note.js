var config = require('../config'),
    mongoose = config.mongoose,
    encrypt = config.encrypt,
    Schema = mongoose.Schema,
    User = require('./user')

var NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    coverUrl: {
        type: String,
        default: 'http://localhost:3000/images/reading.jpeg'
    },
    publishTime: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    stars: {
        type: [String],
        default: []
    },
    address: {
        type: String,
        default: 'Yanan',
    },
    spend: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ['travel', 'reading'],
        default: 'travel'
    }
})

/**
 * 获取全部笔记
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.findAll = function(callback) {
    return this.model('Note').find({}).exec(callback)
}

/**
 * 获取全部读书笔记
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.findAllReadings = function(callback) {
    return this.model('Note').find({
        type: 'reading'
    }).exec(callback)
}

/**
 * 获取全部读书笔记
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.findAllTravels = function(callback) {
    return this.model('Note').find({
            type: 'travel'
        })
        .exec(callback)
}

/**
 * 获取某个笔记
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.findById = function(_id, callback) {
    return this.model('Note').findOne({
        _id: _id
    }).exec(callback)
}

/**
 * 通过作者查找
 * @param  {[type]}   loginId  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.findByAuthor = function(_id, callback) {
    return this.model('Note').find({
        _id: _id
    }).populate('author').exec(callback)
}

/**
 * 删除某个笔记
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.deleteById = function(_id, callback) {
    return this.model('Note').remove({
        _id: _id
    }).exec(callback)
}

/**
 * 更新某个笔记
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.updateById = function(_id, fields, callback) {
    return this.model('Note').update({
        _id: _id
    }, fields).exec(callback)
}

/**
 * 点赞
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
NoteSchema.statics.star = function(_id, username, callback) {
    var conditions = {
            _id: _id
        },
        updates = {
            $addToSet: {
                stars: username
            }
        },
        options = {}
    return Note.update(conditions, updates, options, callback)
}

var Note = mongoose.model('Note', NoteSchema)

// new Note({
//     title: 'note title x',
//     content: 'note content x',
//     author: '57259c90d069b0e9b48714bf'
// }).save(function(err, note) {
//     console.log(err)
//     console.log(note)
// })

module.exports = Note
