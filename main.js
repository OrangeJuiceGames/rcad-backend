require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/user')
const mongoose = require('mongoose')

app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use('/', routes)
app.route('/')
    .get(function(req, res)
    {
        res.sendFile(process.cwd() + '/index.html')
    })

app.get("/", function (req, res){
    res.send.apply(req.headers, req.originalUrl, req.method, req.body)
})

const listener = app.listen(process.env.PORT || 3000, ()=>{
    console.log('RCAD API listening on port ' + listener.address().port)
})

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(
    process.env.MONGODB_URI,
    connectionParams,
        (err) => {
            if (err) return console.log("Error: ", err);
            console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
        }
    );