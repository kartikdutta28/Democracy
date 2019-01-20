let mongoose=require('mongoose');

//Leader schema
let leaderSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    education:{
      type:String,
      required:true
    },
    party:{
      type:String,
      required:true
    }

});
let Leader=module.exports=mongoose.model('Leader',leaderSchema);
