require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const engine = require('ejs-locals');
const app = express();
const config = require('./lib/env').getConfig();
const db = require('./lib/db');

const env = config.env
const port = config.server.port;


app.use(bodyParser.json({ type: 'application/json' }))

// config ejs
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


db.connectToServer((err)=>{
    if(err){
        console.error('Error al conectar con la base de datos');
        if (env != 'production') console.log(err);
        process.exit()
    }   
    app.listen(port, () => {
        console.log(`✔ Express server listening on port ${port}`);
    })
})