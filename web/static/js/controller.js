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
    MOOAPP.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
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
                    params: {
                        'notes': {}
                    },
                    views: {
                        '@': {
                            templateUrl: tpl.posts
                        },
                        'header@': {
                            templateUrl: tpl.header_user
                        }
                    }
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
        .controller('note_readingsController', note_readingsController)
        .controller('note_travelsController', note_travelsController)


    // USER CONTROLLER
    //===============================================
    function user_signController($scope, $timeout, $state, $cookies, data) {
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
        var uid = $cookies.get('uid')
        if (uid) {
            uid = /"(\w+)"/.exec(uid)[1]
            data.user.get(uid, function(response) {
                $scope.user = response.user
            })
        } else {
            $state.go('user.signin')
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

    function user_postsController($scope) {

    }

    // NOTE CONTROLLER
    //===============================================

    function note_editorController($scope,data) {
        $scope.pushReading = function() {
            data.note.add($scope.reading).success(function(response){
                if(response.note){
                    alert('publish success')
                }else{
                    alert('publish failed')
                }
            })
        }

        $scope.pushTravel = function() {
            console.log($scope.travel)
        }
    }

    function note_listController($scope, $timeout, data, $cookies) {
        data.note.list(function(response) {
            $scope.notes = response.data
            console.log($scope.notes)
        })
    }

    function note_singleController($scope, $stateParams) {
        console.log($stateParams)
    }

    function note_readingsController($scope) {
        
    }

    function note_travelsController($scope) {

    }
