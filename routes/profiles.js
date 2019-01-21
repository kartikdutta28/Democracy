const express = require('express');
const router =express.Router();
let Leader=require('../models/leader');

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
