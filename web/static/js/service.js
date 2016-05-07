(function() {
    var MOOAPP = angular.module('MOOAPP')
    MOOAPP.factory('data', ['$http', function($http) {
        return {
            user: {
                signin: function(user) {
                    return $http.post("/api/user/signin", { loginId: user.loginId, password: user.password });
                },
                signup: function(user) {
                    return $http.post("/api/user/signup", { loginId: user.loginId, password: user.password, email: user.email });
                },
                // get_me: function() {
                //     return $http.get("/api/user");
                // },
                update: function(id, fields) {
                    return $http.put("/api/user/edit", { id: id, fields: fields });
                },
                // update_avatar: function(path) {
                //     return $http.put("/api/user/avatar", { path: path });
                // },
                // edit: function(password, new_password) {
                //     return $http.put("/api/user/password", { password: password, new_password: new_password });
                // }
            },
            note: {
                list: function() {
                    return $http.get('/api/note')
                },
                readings: function() {
                    return $http.get('/api/note/readings')
                },
                travels: function() {
                    return $http.get('/api/note/travels')
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
                get: function(_id) {
                    return $http.get('/api/note/' + _id);
                },
                star: function(_id) {
                        return $http.post('/')
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
