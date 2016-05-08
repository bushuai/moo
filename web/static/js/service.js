(function() {
    var MOOAPP = angular.module('MOOAPP')
    MOOAPP.factory('data', ['$http', function($http) {
        return {
            user: {
                signin: function(user, fn) {
                    return $http.post("/api/user/signin", { loginId: user.loginId, password: user.password })
                        .success(function(response) {
                            fn(response)
                        })
                        .success(function(response) {
                            fn(response)
                        })
                },
                signup: function(user, fn) {
                    return $http.post("/api/user/signup", { loginId: user.loginId, password: user.password, email: user.email })
                        .success(function(response) {
                            fn(response)
                        })
                },
                get: function(_id, fn) {
                    return $http.get("/api/user/" + _id).success(function(response) {
                        fn(response)
                    })
                },
                update: function(id, fields, fn) {
                    return $http.put("/api/user/edit", { id: id, fields: fields })
                        .success(function(response) {
                            fn(response)
                        })
                },
                // update_avatar: function(path) {
                //     return $http.put("/api/user/avatar", { path: path });
                // },
                // edit: function(password, new_password) {
                //     return $http.put("/api/user/password", { password: password, new_password: new_password });
                // }
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
                // add: function(category, title, summary, content, published) {
                //     return $http.post("/api/post", {
                //         category: category,
                //         title: title,
                //         summary: summary,
                //         content: content,
                //         published: published
                //     });
                // },
                // get_for_me: function(page, size) {
                //     return $http.get("/api/posts/me?page=" + page + "&size=" + size);
                // },
                get: function(_id, fn) {
                    return $http.get('/api/note/' + _id)
                        .success(function(response) {
                            fn(response)
                        })
                },
                star: function(_id, fn) {
                        return $http.post('/')
                            .success(function(response) {
                                fn(response)
                            })
                    }
                    // update: function(post_id, category, title, summary, content, published) {
                    //     return $http.put("/api/posts/" + post_id, {
                    //         category: category,
                    //         title: title,
                    //         summary: summary,
                    //         content: content,
                    //         published: published
                    //     });
                    // },
                    // publish: function(post_id) {
                    //     return $http.put("/api/posts/" + post_id + "/publish", {});
                    // },
                    // unpublish: function(post_id) {
                    //     return $http.put("/api/posts/" + post_id + "/unpublish", {});
                    // },
                    // trash: function(post_id) {
                    //     return $http.delete("/api/posts/" + post_id, {});
                    // }
            }
        };
    }])
})()
