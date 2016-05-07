(function() {

    var MOOAPP = angular.module('MOOAPP', ['ui.router'])

    MOOAPP.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
            $httpProvider.interceptors.push(["$q", function($q) {
                return {
                    request: function(config) {
                        return config
                    },
                    response: function(response) {
                        console.log('from provider response')
                        console.log(response)
                            //|| response.data.code !== 200
                        if (!response.data || response.status !== 200) {
                            return $q.reject('failed')
                        }
                        return response
                    }
                }
            }])

            // $urlRouterProvider.otherwise('/')

            $stateProvider
                .state('index', {
                    url: '/',
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
                    template: '<div ui-view></div>'
                })
                .state('note.detail', {
                    url: '/detail/:id',
                    resolve: {
                        singleNote: function($stateParams, data) {
                            var _id = $stateParams.id
                            return data.note.get(_id)
                                .success(function(response) {
                                    console.log(response.data)
                                    return response.data
                                })
                                .error(function(response) {
                                    return null
                                })
                        }
                    },
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
        .controller('singleNoteController', ['$scope', function($scope) {
            console.log('fetch data here')
        }])
        .controller('dashboardController', ['$scope', function($scope) {
            $scope.message = "Hello from controller for dashboardController"
        }])

})()
