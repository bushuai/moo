    var MOOAPP = angular.module('MOOAPP', ['ui.router'])

    MOOAPP.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
            $httpProvider.interceptors.push(["$q", function($q) {
                return {
                    request: function(config) {
                        return config
                    },
                    response: function(response) {
                        if (!response.data || response.status !== 200 && response.data.code !== 200) {
                            return $q.reject('failed')
                        }
                        return response
                    }
                }
            }])

            $stateProvider
                .state('index', {
                    url: '',
                    views: {
                        '@': {
                            templateUrl: '../view/pages/welcome.html'
                        },
                        'header@': {
                            templateUrl: '../view/header/header.html'
                        }
                    }
                })
                .state('user', {
                    url: '/user',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                .state('user.login', {
                    url: '/signin',
                    views: {
                        '@': {
                            templateUrl: '../view/user/signin.html'
                        },
                        'header@': {
                            templateUrl: '../view/header/header.html'
                        }
                    }
                })
                .state('user.signup', {
                    url: '/signup',
                    views: {
                        '@': {
                            templateUrl: '../view/user/signup.html'
                        },
                        'header@': {
                            templateUrl: '../view/header/header.html'
                        }
                    }
                })
                .state('user.dashboard', {
                    url: '/dashboard',
                    views: {
                        '@': {
                            templateUrl: '../view/user/dashboard.html'
                        },
                        'header@': {
                            templateUrl: '../view/header/header.html'
                        }
                    },
                    controller: 'dashboardController'
                })
                .state('note', {
                    url: '/note',
                    abstract: true,
                    template: '<div ui-view></div>',
                })
                .state('note.detail', {
                    url: '/detail/:id',
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
                            templateUrl: '../view/note/note.html'
                        },
                        'header@': {
                            templateUrl: '../view/header/header.html'
                        },
                        'footer@': {
                            templateUrl: '../view/footer/footer.html'
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
        .controller('userController', ['$scope', '$timeout', 'data', function($scope, $timeout, data) {
            $scope.js_signup = function() {
                alert('called user signup')
                $scope.signning = true
                data.user.signup($scope.user)
                    .success(function(result) {
                        // alert('注册成功')
                        console.log(result)
                        $timeout(function() {
                            window.location.href = "/user/signin";
                        }, 2000)
                    })
                    .error(function(result) {
                        alert('注册错误')
                        console.log(result)
                    })
                    .finally(function() {
                        $scope.signning = false
                    })
            }
            $scope.js_signin = function() {
                data.user.signin($scope.user)
                    .success(function(result) {
                        alert('登陆成功')
                        console.log(result.data)
                    })
                    .error(function(result) {
                        alert('登录失败')
                    })
            }
        }])
        .controller('noteController', ['$scope', '$timeout', 'data', function($scope, $timeout, data) {
            $scope.js_note_list = function() {
                data.note.list()
                    .success(function(result) {
                        alert('get note list success')
                    })
            }
        }])
        .controller('dashboardController', ['$scope', function($scope) {
            $scope.message = "Hello from controller for dashboardController"
        }])
