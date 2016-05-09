    var MOOAPP = angular.module('MOOAPP', ['ui.router', 'ngCookies'])
        //defind templates location
    var tpl = {
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
                        // var isTemplate = typeof response.data === 'string' && response.status === 200
                        // var isData = typeof response.data === 'object' && response.data.code === 200
                        //     // var notLogined = typeof response.data === 'object' && response.data.code === 1005

                        // // if (notLogined) {
                        // // $state.go('user.signin')
                        // // return
                        // // }
                        // console.log(typeof response.data, response.status)

                        // if (isTemplate || isData) {
                        //     return response
                        // } else {
                        //     return $q.reject('failed')
                        // }
                        return response
                    }
                }
            }])

            $urlRouterProvider.otherwise('/')
            $stateProvider
                .state('index', {
                    url: '/',
                    views: {
                        '@': {
                            templateUrl: tpl.welcome
                        },
                        'header@': {
                            templateUrl: tpl.header
                        }
                    }
                })
                .state('user', {
                    url: '/user',
                    abstract: true
                })
                .state('user.signin', {
                    url: '/signin',
                    views: {
                        '@': {
                            templateUrl: tpl.signin
                        },
                        'header@': {
                            templateUrl: tpl.header
                        }
                    },
                    controller: 'signController'
                })
                .state('user.signup', {
                    url: '/signup',
                    views: {
                        '@': {
                            templateUrl: tpl.signup
                        },
                        'header@': {
                            templateUrl: tpl.header
                        }
                    },
                    controller: 'signController'
                })
                .state('user.dashboard', {
                    url: '/dashboard',
                    // resolve: {
                    //     loadNote: function($cookies, $q) {
                    //         var defer = $q.defer()
                    //         var uid = /"(\w+)"/ig.exec($cookies.get('uid'))[1]
                    //         data.user.get(uid, function(response) {
                    //             console.og(response)
                    //             defer.resolve(response.data)
                    //         })
                    //         return defer.promise
                    //     }
                    // },
                    views: {
                        '@': {
                            templateUrl: tpl.dashboard
                        },
                        'header@': {
                            templateUrl: tpl.header_user
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
                    templateUrl: tpl.not_list,
                    controller: 'notesController',
                    views: {
                        '@': {
                            templateUrl: tpl.note_list
                        },
                        'header@': {
                            templateUrl: tpl.header_fn
                        },
                        'footer@': {
                            templateUrl: tpl.footer
                        }
                    }
                })
                .state('note.detail', {
                    url: '/detail/:id',
                    views: {
                        '@': {
                            templateUrl: tpl.note
                        },
                        'header@': {
                            templateUrl: tpl.header_fn
                        },
                        'footer@': {
                            templateUrl: tpl.footer
                        }
                    },
                    controller: 'noteController'
                })
        }])
        .controller('signController', ['$scope', '$timeout', '$state', '$cookies', 'data', function($scope, $timeout, $state, $cookies, data) {
            $scope.signup = function() {
                data.user.signup($scope.user, function(response) {
                    $state.go('user.signin')
                })
            }

            $scope.signin = function(isValid) {
                if (isValid) {
                    data.user.signin($scope.user, function(response) {
                        $state.go('user.dashboard')
                    })
                } else {
                alert('not vlaid')
                }
            }
        }])
        .controller('notesController', ['$scope', '$timeout', 'data', function($scope, $timeout, data) {
            data.note.list(function(response) {
                $scope.notes = response.data
                console.log($scope.notes)
            })
        }])
        .controller('noteController', ['$scope', '$stateParams', 'data', function($scope, $stateParams, data) {
            // var _id = $stateParams.id
            // data.note.get(_id, function(response) {
            //     $scope.note = response.data
            // })
        }])
        .controller('dashboardController', ['$scope', '$cookies', 'data', function($scope, $cookies, data) {
            var uid = /"(\w+)"/ig.exec($cookies.get('uid'))[1]
            data.user.get(uid, function(response) {
                $scope.user = response.data
            })
        }])
