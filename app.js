const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//Load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Parse application
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Set public folder for static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/',function(req,res){
    res.render('index');
});

app.listen(3000,function(){
    console.log("Server Started at port 3000");
});