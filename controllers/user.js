const User = require('../models/user')
const setHighScore = (req, res, next) => 
{
    console.log(req.body.user_id)
    User.findOne({user_key : req.body.user_key}, (err, data)=>{
        console.log(data)
        if(!data)
        {
            const u = new User({
                user_key: req.body.user_key,
                user_id : req.body.user_id,
                score: req.body.score
            })
            
            u.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);

            var respose = "";

            if(data.score >= req.body.score)
            {
                respose = "User has same or higher socre";
            }else
            {
                data.score = req.body.score;
                data.save()
                respose = "User has beat high score";
            }

            return res.json({message:respose});
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