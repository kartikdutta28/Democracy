let mongoose=require('mongoose');

//Poll schema
let pollSchema = mongoose.Schema({
  topic: String,
        choices: [
            {
                value: String,
                votes: Number
            }
        ]
});
let Poll=module.exports=mongoose.model('Poll',pollSchema);
