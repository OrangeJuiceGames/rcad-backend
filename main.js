require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const routes = require('./routes/user')
const mongoose = require('mongoose')
const {MongoClient} = require('mongodb');



//const compression = require('compression');
//app.use(compression())

app.use(express.json())
//app.use(helmet())
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

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main()
{
    const client = new MongoClient(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });

    try{
        await client.connect()
        await listDatabases(client)
    }catch(e)
    {
        console.error(e)
    }finally{
        await client.close()
    }
}

main().catch(console.error);




/*
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
*/