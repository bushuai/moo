1. angular路由渲染的问题，content@和content@user.login是不同的，为什么不同
2. MEAN文件架构的问题，如何更好更高效的组织代码
3. 如何编写更简洁的API
4. 在express3.x使用layout简化模板，如何使用，怎么简化模板，代码重用。
5. npm国内无法使用或连接超时，使用cnpm，cnpm为什么好，好在哪里。
6. 布局问题，有哪些好的布局方法。
7. crypto解决密码问题
8. cros问题，跨域问题。
9. ui.router resolve 无法实例化并绑定对应的controller




1. 五味 使用ui.Router实现全站实时跳转，每次跳转之后就会去获取数据渲染视图，开发中遇到ui-router获取传递值的问题？


ui.Router官方文档介绍resolve是一个能够在ngRoute或者uiRouter的路由中获取数据的属性，在路由更改之后包含了一个或者多个成功返回Promise，也就是说在请求数据没有准备好之前是不会渲染view，请求成功之后直接传递给controller，controller不用再想外部请求数据。resolve属性可以注入service来完成数据的交互。五味网站路由中使用resolve属性用来设置每次访问路由时传递的参数，但是前期一直无法获取对应参数，问题代码如下：

```
$stateProvider.state('note.detail', {
                    url: '/detail/:id',
                    resolve: {
                        note: function($state,data) {
                            var _id = $state.current.params.id
                            data.note.get(_id)
                                .success(function(response) {
                                    return response
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
                    controller: 'noteController'
                })
```

每次获取参数始终都是undefined，$state是一个Provider，用来提供当前路由状态的信息，$state.current代表当前视图，实际无法通过$state.current.params.id的形式收到参数，可能的问题在于：

1. 路由跳转错误导致参数无法传递
2. $stateProvider使用方式错误
3. url嵌套解析错误

通过检查，不存在url嵌套和路由跳转的问题，通过再次查找资料，发现ui.router还提供另外一个Provider：$stateParams。在resolve中注入$stateParams,通过

```
$stateParams.id
```

resolve无法传递provider