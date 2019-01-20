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

module.exports = router;
