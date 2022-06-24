const http = require('http')
const app = require('./api');
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')

// all environments
app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

const server = http.createServer(app)
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})