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
        'setting': '../view/pages/setting.html',
        'posts': '../view/user/posts.html',
        //note
        'note': '../view/note/note.html',
        'note_list': '../view/note/note_list.html'
    }
    MOOAPP
        .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
            // Interceptors
            //===============================================
            $httpProvider.interceptors.push(["$q", function($q) {
                return {
                    request: function(config) {
                        return config
                    },
                    response: function(response) {
                        console.log(response)
                        var isTemplate = typeof response.data === 'string' && response.status === 200
                        var isData = typeof response.data === 'object' && response.data.code === 200
                            // var notLogined = typeof response.data === 'object' && response.data.code === 1005

                        // // if (notLogined) {
                        // // $state.go('user.signin')
                        // // return
                        // // }
                        // console.log(typeof response.data, response.status)

                        if (isTemplate || isData) {
                            return response
                        } else {
                            return $q.reject('failed')
                        }
                    }
                }
            }])

            // States
            //===============================================
            $urlRouterProvider.otherwise('/')
                // Index State
                //===============================================
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
                // USER State
                //===============================================
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
                    controller: 'user_signController'
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
                    controller: 'user_signController'
                })
                .state('user.setting', {
                    url: '/setting',
                    views: {
                        '@': {
                            templateUrl: tpl.setting
                        },
                        'header@': {
                            templateUrl: tpl.header_user
                        }
                    },
                    controller: 'user_settingController'
                })
                .state('user.dashboard', {
                    url: '/dashboard',
                    params: {
                        'user': {}
                    },
                    views: {
                        '@': {
                            templateUrl: tpl.dashboard
                        },
                        'header@': {
                            templateUrl: tpl.header_user
                        }
                    },
                    controller: 'user_dashboardController'
                })
                .state('user.posts', {
                    url: '/posts',
                    views: {
                        '@': {
                            templateUrl: tpl.posts
                        },
                        'header@': {
                            templateUrl: tpl.header_user
                        }
                    },
                    controller: 'user_postsController'
                })
                // Note State
                //===============================================
                .state('note', {
                    url: '/note',
                    abstract: true,
                    template: '<div ui-view></div>',
                })
                .state('note.all', {
                    url: '/all',
                    templateUrl: tpl.not_list,
                    controller: 'note_listController',
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
                .state('note.readings', {
                    url: '/readings',
                    templateUrl: tpl.not_list,
                    controller: 'note_readingsController',
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
                .state('note.travels', {
                    url: '/travels',
                    templateUrl: tpl.not_list,
                    controller: 'note_travelsController',
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
                    params: {
                        'id': ""
                    },
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
                    controller: 'note_singleController'
                })
        }])
        // Controllers
        //===============================================
        .controller('user_signController', user_signController)
        .controller('user_dashboardController', user_dashboardController)
        .controller('user_settingController', user_settingController)
        .controller('user_postsController', user_postsController)
        .controller('note_listController', note_listController)
        .controller('note_singleController', note_singleController)
        .controller('note_editorController', note_editorController)
        .controller('note_listController', note_listController)
        .controller('note_listController', note_listController)


    // USER CONTROLLER
    //===============================================
    function user_signController($scope, $timeout, $state, $cookies, data) {

        $scope.init = function() {
            if (data.uid()) {
                $state.go('user.dashboard')
            }
        }

        $scope.signup = function(isValid) {
            if (isValid) {
                data.user.signup($scope.user, function(response) {
                    console.log('res from signup');
                    console.log(response)
                    if (response.user) {
                        $state.go('user.signin', response.user)
                    } else {
                        alert('failed')
                    }
                })
            } else {
                alert('signup vlaid')
            }
        }

        $scope.signin = function(isValid) {
            if (isValid) {
                data.user.signin($scope.user, function(response) {
                    $state.go('user.dashboard', { user: response.user })
                })
            } else {
                alert('signin vlaid')
            }
        }
    }

    function user_dashboardController($scope, $cookies, $stateParams, $state, data) {
        $scope.init = function() {
            var xid = data.uid()
            if (xid) {
                data.user.get(xid, function(response) {
                    console.log('response from userdashboard')
                    console.log(response.user)
                    $scope.user = response.user
                })
            } else {
                $state.go('user.signin')
            }
        }

        $scope.logout = function() {
            $cookies.remove('uid')
            $cookies.remove('xid')
            $state.go('user.signin')
            return
        }

    }

    function user_settingController($scope) {

    }

    function user_postsController($scope, data, $cookies) {
        $scope.init = function() {
            data.user.posts(function(response) {
                console.log(response.posts)
                $scope.posts = response.posts
            })
        }

        $scope.remove = function(id) {
            alert('remove ' + id)
        }

        $scope.edit = function(id) {
            alert('edit ' + id)
        }
    }

    // NOTE CONTROLLER
    //===============================================

    function note_editorController($scope, data, $cookies) {
        $scope.xid = data.uid()
        $scope.reading = {
            type: 'reading',
            author: $scope.xid
        }
        console.log($scope.xid);
        $scope.travel = {
            type: 'travel',
            author: $scope.xid
        }
        $scope.pushReading = function() {
            console.log($scope.reading)
            data.note.add($scope.reading, function(response) {
                console.log(response)
                if (response.note) {
                    alert('publish success')
                } else {
                    alert('publish failed')
                }
            })
        }

        $scope.pushTravel = function() {
            console.log($scope.travel)
            data.note.add($scope.travel, function(response) {
                if (response.note) {
                    alert('publish success')
                } else {
                    alert('publish failed')
                }
            })
        }
    }

    function note_listController($scope, $timeout, data, $cookies) {
        $scope.switchAll = function() {
            data.note.list(function(response) {
                $scope.notes = response.notes
                console.log($scope.notes)
            })
        }

        $scope.switchReadings = function() {
            data.note.readings(function(response) {
                $scope.notes = response.readings
            })
        }

        $scope.switchTravels = function() {
            data.note.travels(function(response) {
                $scope.notes = response.travels
            })
        }
    }

    function note_singleController($scope, $stateParams, $state,data) {
        $scope.init = function() {
            data.note.get($stateParams.id, function(response) {
                $scope.note = response.note
            })
        }

        $scope.star = function() {
            data.note.star($scope.note._id, function(response) {
                $scope.note = response.note
                $state.go($state.current, {}, { reload: true });

            })
        }
    }
