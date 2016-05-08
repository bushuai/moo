    var MOOAPP = angular.module('MOOAPP', ['ui.router', 'ngCookies'])
        //defind templates location
    var views = {
        //common
        'header': '../view/header/header.html',
        'header_fn': '../view/header/header-fn.html',
        'header_user': '../view/header/header-user.html',
        'footer': '../view/footer/footer.html',
        'welcome': '../view/pages/welcome.html',
        //user
        'signup': '../view/user/signup.html',
        'signin': '../view/user/signin.html',
        'dashboard': '../view/user/dashboard.html',
        //note
        'note': '../view/note/note.html',
        'note_list': '../view/note/note_list.html'
    }
    MOOAPP.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
            $httpProvider.interceptors.push(["$q", function($q) {
                return {
                    request: function(config) {
                        return config
                    },
                    response: function(response) {
                        console.log(response)
                        var isTemplate = typeof response.data !== 'object' && response.status === 200
                        var isData = typeof response.data === 'object' && response.data.code === 200
                        var notLogined = typeof response.data === 'object' && response.data.code === 1005

                        if (notLogined) {
                            $state.go('user.signin')
                            return
                        }
                        if (isTemplate || isData) {
                            return response
                        } else {
                            return $q.reject('failed')
                        }

                        // if (typeof response.data !== 'object' && response.status === 200) {
                        // return response
                        // } else if(typeof response.data ==='object' && response.data.data.code === 200){
                        // return $q.reject('failed')
                        // }
                        //     if (!response.data || response.status !== 200 && response.data.code !== 200) {
                        //     }
                        // return response
                    }
                }
            }])

            $stateProvider
                .state('index', {
                    url: '',
                    views: {
                        '@': {
                            templateUrl: views.welcome
                        },
                        'header@': {
                            templateUrl: views.header
                        }
                    }
                })
                .state('user', {
                    url: '/user',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                .state('user.signin', {
                    url: '/signin',
                    views: {
                        '@': {
                            templateUrl: views.signin
                        },
                        'header@': {
                            templateUrl: views.header
                        }
                    },
                    controller: 'signController'
                })
                .state('user.signup', {
                    url: '/signup',
                    views: {
                        '@': {
                            templateUrl: views.signup
                        },
                        'header@': {
                            templateUrl: views.header
                        }
                    },
                    controller: 'signController'
                })
                .state('user.dashboard', {
                    url: '/dashboard',
                    views: {
                        '@': {
                            templateUrl: views.dashboard
                        },
                        'header@': {
                            templateUrl: views.header_user
                        }
                    },
                    controller: 'dashboardController'
                })
                .state('note', {
                    url: '/note',
                    abstract: true,
                    template: '<div ui-view></div>',
                })
                .state('note.all', {
                    url: '/all',
                    templateUrl: views.not_list,
                    controller: 'noteController',
                    views: {
                        '@': {
                            templateUrl: views.note_list
                        },
                        'header@': {
                            templateUrl: views.header_fn
                        },
                        'footer@': {
                            templateUrl: views.footer
                        }
                    }
                })
                .state('note.detail', {
                    url: '/detail/:id',
                    // :-(   
                    // resolve: {
                    //     notex: ['$stateParams', '$q', 'data', function($stateParams, $q, data) {
                    //         var defer = $q.defer()
                    //         var _id = $stateParams.id
                    //         return data.note.get(_id)
                    //             .success(function(response) {
                    //                 return response.data.data
                    //             })
                    //             .error(function(error) {
                    //                 return error
                    //             })
                    //             // .then(function(response) {
                    //             //     return response.data.data
                    //             // }, function(error) {
                    //             //     return error
                    //             // })
                    //     }]
                    // },
                    views: {
                        '@': {
                            templateUrl: views.note
                        },
                        'header@': {
                            templateUrl: views.header_fn
                        },
                        'footer@': {
                            templateUrl: views.footer
                        }
                    },
                    controller: 'singleNoteController'
                })
        }])
        .controller('singleNoteController', ['$scope', '$stateParams', 'data', function($scope, $stateParams, data) {
            var _id = $stateParams.id
            data.note.get(_id)
                .success(function(response) {
                    $scope.note = response.data
                })
        }])
        .controller('signController', ['$scope', '$timeout', '$state', '$cookies', 'data', function($scope, $timeout, $state, $cookies, data) {

            var isOnline = $cookies.get('online')
            if (typeof isOnline !== 'undefined') {
                $state.go('user.dashboard')
            } else {
                $state.go('user.signin')
            }

            $scope.js_signup = function() {
                data.user.signup($scope.user)
                    .success(function(result) {
                        alert('注册成功')
                        console.log(result)
                    })
                    .error(function(result) {
                        alert('注册错误')
                        console.log(result)
                    })
            }

            $scope.js_signin = function() {
                data.user.signin($scope.user)
                    .success(function(result) {
                        console.log($cookies.getAll())
                        $state.go('user.dashboard', {
                            user: result.data
                        })
                        console.log(result.data)
                    })
                    .error(function(result) {
                        alert('登录失败')
                    })
            }
        }])
        .controller('noteController', ['$scope', '$timeout', 'data', function($scope, $timeout, data) {
            data.note.list()
                .success(function(result) {
                    $scope.allNotes = result.data
                    console.log($scope.allNotes)
                })
        }])
        .controller('dashboardController', ['$scope', '$stateParams', '$cookies', 'data', function($scope, $stateParams, $cookies, data) {
            var uid = /"(\w+)"/ig.exec($cookies.get('uid'))[1]

             data.user.get(uid)
                .success(function(result) {
                   $scope.currentUser = result.data
                })
                .error(function(){
                    $state.go('user.signin')
                })
        }])
