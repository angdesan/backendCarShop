const { MongoClient } = require('mongodb')
const config = require('../lib/env').getConfig()

let dbConnection

module.exports = {
    connectToServer:  (callback) => {
        try {
            let uri = process.env.CONN_DB_DEV
            const env = process.env.NODE_ENV || 'development'
            if (env == 'production') uri = process.env.CONN_DB_PROD
            

            const client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            client.connect();
            dbConnection = client.db(config.database.name);
            console.log("conectado a db con exito")
            return callback()
        }catch(err){
            console.log(err.message);
        }
    
  },

    getDb: () => {
        return dbConnection
    },
}