const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
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
app.set('view engine','pug');

//Parse application
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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
app.post('/profiles/:id/act', (req, res, next) => {
        const action = req.body.action;
        const counter = action === 'UpVote' ? 1 : -1;
        Leader.updateOne({_id: req.params.id}, {$inc: {vote: counter}}, {}, (err, numberAffected) => {
            pusher.trigger('post-events', 'postAction', { action: action, postId: req.params.id }, req.body.socketId);
            res.send('');
        });
});
app.post('/:pollId/vote', (req, res, next) => {
       const choice = req.body.choice;
       const identifier = `choices.${choice}.votes`;
       Poll.update({_id: req.params.pollId}, {$inc: {[identifier]: 1}}, {}, (err, numberAffected) => {
           let Pusher = require('pusher');
           let pusher = new Pusher({
               appId:'695685',
               key:'5e1bf950f632c8c82386',
               secret:'e5cd75bfff6ffaa060c7',
               cluster: 'ap2'
           });

           let payload = { pollId: req.params.pollId, choice: choice };
           pusher.trigger('poll-events', 'vote', payload, req.body.socketId);

           res.send('');
       });

   });
let posts = require('./routes/posts');
app.use('/posts',posts);
let profiles = require('./routes/profiles');
app.use('/profiles',profiles);
let polls = require('./routes/polls');
app.use('/polls',polls);


app.listen(3000,function(){
    console.log("Server Started at port 3000");
});
