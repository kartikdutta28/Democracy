const express = require('express');
const router =express.Router();
let Leader=require('../models/leader');
var Pusher = require('pusher');
var pusher = new Pusher({
  appId: '695685',
  key: '5e1bf950f632c8c82386',
  secret: 'e5cd75bfff6ffaa060c7',
  cluster: 'ap2',
  encrypted: true
});

router.get('/',function(req,res){
  Leader.find({},function(err,leaders){
    if(err){
      console.log(err);
    }
    else{
      res.render('profiles',{
        leaders:leaders
      });
    }
  });
});
router.post('/:id/act', (req, res, next) => {
        const action = req.body.action;
        const counter = action === 'UpVote' ? 1 : -1;
        Leader.updateOne({_id: req.params.id}, {$inc: {vote: counter}}, {}, (err, numberAffected) => {
            pusher.trigger('post-events', 'postAction', { action: action, postId: req.params.id }, req.body.socketId);
            res.send('');
        });
});

// router.post('/vote/:id',function(req,res){
//   Leader.findOneAndUpdate({ _id: res._id }, { $inc: { vote: 1 } }, {new: true },function(err, response) {
//     if (err) {
//       callback(err);
//     } else {
//       res.redirect('/');
//     }
//   });
//
// });
router.get('/vote/:id',function(req,res){
  res.redirect('/profiles');
});

router.post('/vote/:id',function(req,res){
  Leader.findOneAndUpdate({ _id: res._id }, { $inc: { vote: 1 } }, {new: true },function(err, response) {
    if (err) {
      callback(err);
    } else {
      res.redirect('/profiles');
      console.log('Sucess');
    }
  });
});
module.exports = router;
