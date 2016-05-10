var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    // expressLayout = require('express3-ejs-layout'),
    cors = require('cors'),
    config = require('./server/config/config'),
    users = require('./server/routes/users'),
    notes = require('./server/routes/notes'),
    auth = require('./server/config/auth')
    app = express()

// view engine setup
app.set('views', path.join(__dirname, '/web/static/view'))
app.use(express.static(path.join(__dirname, '/web/static')))

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
// app.set('layout', 'layout')
// app.use(expressLayout)
app.use(cors())

app.set('trust proxy', 1)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser(config.secret))

// app.use(session({
//     secret: config.secret
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 60000,
//         secure: true,
//     }
// }))

app.set("layout extractScripts", true)

// custome routes
app.use(auth.authorize)
app.use('/api/user', users)
app.use('/api/note', notes)

//render welcome page
// app.get('/', function(req, res) {
//     res.locals.page = 'welcome'
//     res.render('pages/welcome')
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handlers
// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500)
//         res.render('error', {
//             message: err.message,
//             error: err
//         })
//     })
// }

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app
