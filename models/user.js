const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        user_id:{type:String, require:true},
        score:  {type:Number, require:true}
    }
)

const User = mongoose.model('User', UserSchema);
module.exports = User;