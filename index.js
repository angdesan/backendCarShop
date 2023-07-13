require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const engine = require('ejs-locals');
const cors = require('cors');
const configCors = require('./config/cors');
const app = express();
const config = require('./lib/env').getConfig();
const db = require('./lib/db');
const routesApi = require('./api/routes/routesApi');
const routesAdmin = require('./api/routes/routesViews');
const env = config.env
const port = config.server.port;

// Middlewares
app.use(bodyParser.json({ type: 'application/json' }))
app.use(cors(configCors))
app.use(session({
    secret: 'password',
    cookie: {maxAge: 3600000 }

}));

// config ejs
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// API
app.use('/api',routesApi);

//sitio admin
app.use('/admin',routesAdmin);

app.use((req, res, next) => {
    if (req.url === '/' || req.url.startsWith('/client')) {
      res.sendFile(path.join(__dirname, '/build/index.html'));
    } else {
      next();
    }
});


// renderización app React
app.use(express.static(path.join(__dirname, "build")));


db.connectToServer((err) => {
    if (err) {
        if (env != 'production') console.log(err);
        process.exit()
    }
    app.listen(port, () => {
        console.log(`✔ Express server listening on port ${port}`);
    })
})
