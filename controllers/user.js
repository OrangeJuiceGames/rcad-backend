const User = require('../models/user')
const setHighScore = (req, res, next) => 
{
    console.log(req.body.user_id)
    User.findOne({user_id : req.body.user_id}, (err, data)=>{
        console.log(data)
        if(!data)
        {
            const u = new User({
                user_id : req.body.user_id,
                score: req.body.score
            })
            
            u.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"User has same or higher socre"});
        }
    })
}

const getHighScores = (req, res, next) => {
    User.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
}

module.exports = 
{
    setHighScore,
    getHighScores
};