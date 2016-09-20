(function() {
    var MOOAPP = angular.module('MOOAPP')
    MOOAPP.factory('data', ['$http', '$cookies', function($http, $cookies) {
        return {
            uid: function() {
                if ($cookies.get('xid')) {
                    console.log('get xid ')
                    return /"(\w+)"/ig.exec($cookies.get('xid'))[1]
                } else {
                    console.log('no xid found;')
                    return null
                }
            },
            user: {
                signin: function(user, fn) {
                    return $http.post('/api/user/signin', { loginId: user.loginId, password: user.password })
                        .success(function(response) {
                            fn(response)
                        })
                },
                signup: function(user, fn) {
                    return $http.post('/api/user/signup', { loginId: user.loginId, password: user.password, email: user.email })
                        .success(function(response) {
                            return fn(response)
                        })
                        .error(function() {
                            return fn(null)
                        })
                },
                get: function(_id, fn) {
                    return $http.get('/api/user/' + _id).success(function(response) {
                        fn(response)
                    })
                },
                update: function(id, fields, fn) {
                    return $http.post('/api/user/edit', { id: id, fields: fields })
                        .success(function(response) {
                            fn(response)
                        })
                },
                posts: function(fn) {
                    return $http.get('/api/user/posts')
                        .success(function(response) {
                            return fn(response)
                        })
                }
            },
            note: {
                list: function(fn) {
                    return $http.get('/api/note')
                        .success(function(response) {
                            fn(response)
                        })
                },
                readings: function(fn) {
                    return $http.get('/api/note/readings')
                        .success(function(response) {
                            fn(response)
                        })
                },
                travels: function(fn) {
                    return $http.get('/api/note/travels')
                        .success(function(response) {
                            fn(response)
                        })
                },
                add: function(note, fn) {
                    return $http.post("/api/note", {
                            title: note.title,
                            content: note.content,
                            spend: note.spend,
                            type: note.type,
                            tags: note.tags,
                            address: note.address,
                            author: note.author
                        })
                        .success(function(response) {
                            fn(response)
                        })
                },
                get: function(_id, fn) {
                    return $http.get('/api/note/' + _id)
                        .success(function(response) {
                            fn(response)
                        })
                },
                star: function(_id, fn) {
                    return $http.post('/api/note/star', { _id: _id })
                        .success(function(response) {
                            return fn(response)
                        })
                }
            }
        };
    }])
})()
