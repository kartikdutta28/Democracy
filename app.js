const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

let Leader=require('./models/leader');
let Poll = require('./models/poll')


//Connect mongo database usigng mongoose
mongoose.connect(config.database);
let db=mongoose.connection;

//Check connection
db.once('open',function(){
    console.log('Connected to mongodb');
})

//Check for db erros
db.on('error',function(err){
    console.log(err);
})

//Load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

//Parse application
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Express session middle ware
app.use(session({
  secret:'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

//Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//passport config
require('./config/passport')(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set public folder for static files
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.render('index');
});

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '695685',
  key: '5e1bf950f632c8c82386',
  secret: 'e5cd75bfff6ffaa060c7',
  cluster: 'ap2',
  encrypted: true
});

//Setting routes
let posts = require('./routes/posts');
app.use('/posts',posts);
let profiles = require('./routes/profiles');
app.use('/profiles',profiles);
let polls = require('./routes/polls');
app.use('/polls',polls);
let users = require('./routes/users');
app.use('/users',users);

app.listen(3000,function(){
    console.log("Server Started at port 3000");
});
