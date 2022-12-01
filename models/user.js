const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        user_key:{type:String, required:true},
        user_id:{type:String, require:true},
        score:  {type:Number, require:true}
    },{ collection: "gmtk" }
)

const User = mongoose.model('User', UserSchema);
module.exports = User;