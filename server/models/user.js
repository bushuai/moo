var config = require('../config'),
    mongoose = config.mongoose,
    encrypt = config.encrypt,
    Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
        type: String,
        default: 'not set',
        trim: true
    },
    loginId: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        default: 'not set',
        trim: true
    },
    gender: {
        type: String,
        default: 'not set'
    },
    address: {
        type: String,
        default: 'not set'
    },
    regTime: {
        type: Date,
        default: Date.now
    },
    type: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    }
})

UserSchema.statics.findAll = function(callback) {
    return this.model('User')
        .find({})
        .exec(callback)
}

UserSchema.statics.findByName = function(name, callback) {
    return this.model('User').findOne({
        name: new RegExp(name, 'i')
    }).exec(callback)
}

UserSchema.statics.findById = function(_id, callback) {
    return this.model('User')
        .findOne({
            _id: _id
        })
        .exec(callback)
}

UserSchema.statics.findByLoginId = function(loginId, callback) {
    return this.model('User')
        .findOne({
            loginId: loginId
        })
        .exec(callback)
}

UserSchema.statics.deleteById = function(_id, callback) {
    return this.model('User')
        .remove({
            _id: _id
        }).exec(callback)
}

UserSchema.statics.updateById = function(_id, fields, callback) {
    return this.model('User')
        .update({
            _id: _id
        }, fields)
        .exec(callback)
}

UserSchema.methods.validPassword = function(password) {
    return this.password === encrypt(password)
}

var User = mongoose.model('User', UserSchema)

/**
 * TEST CASE
 */

// var bushuai = new User({
//     name: 'b',
//     loginId: 'b',
//     password: encrypt('b'),
//     email:'b@b.com'
// })

// bushuai.save(function(err, user) {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(user.name + ' is saved')
// })

// User.findByName('bushuai', function(err, user) {
//     if (err) {
//         console.log(err)
//         return
//     }

//     if (user.validPassword('bushuai1')) {
//         console.log('passed')
//     } else {
//         console.log('failed')
//     }
// })

// User.findAll(function(err, users) {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(users.length)
// })

// User.deleteByLoginId('bushuai1', function(err) {
//     if (err) {
//         console.log('remove failed')
//         return
//     }
//     console.log('remove success')
// })

// User.updateByLoginId({
//     loginId: 'bushuai1',
//     name: 'bushuai new name',
//     password: 'bushuai new pass'
// }, function(err, user) {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(user)
// })

module.exports = User
