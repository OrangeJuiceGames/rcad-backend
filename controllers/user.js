const User = require('../models/user')
const setHighScore = (req, res, next) => {

    console.log(req.body.user_id)
    User.findOne({user_id : req.body.user_id}, (err, data)=>{
        console.log(data)
        if(!data)
        {
            const u = new User({
                user_id : req.body.user_id,
                score: req.body.score
            })

            console.log(u);
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
    res.json({message: "GET ALL SCORES"})
}

/*

if(!data)
            {
                const usr = new User(
                    {
                        user_id:req.body.user_id,
                        score:req.body.score
                    })

                usr.save((err, data)=>{
                    if(err) return res.json({Error:err})
                    return res.json(data)
                })                        
            }else{
                if(data.score > req.body.score)
                {
                    //data.score = req.body.score;
                    //data.date = new Date();
                    //data.save((err,data)=>{
                        //if(err) return res.json({Error:err})
                        //return res.json(data)
                    //})
                }else{
                    if(err) return res.json(`Something went wrong... ${err}`);
                    return res.json({message:"User with same score is already in db"});
                }
            }
    })

    */


module.exports = 
{
    setHighScore,
    getHighScores
};