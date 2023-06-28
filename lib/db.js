const mongoose =  require('mongoose');
const config = require('./env').getConfig();

/**
 * @function Conexion a mongo atlas
 */

// const URL = process.env.CONN_DB_DEV;
// mongoose.connect(URL)
// .then(()=>{
//     console.log('Database connected!');
// }).catch((err)=>{
//     console.log('Error connecting:', err);
// })

module.exports = {
    connectToServer: (callback)=>{
        let uri = process.env.CONN_DB_DEV;
        const env = process.env.NODE_ENV || 'development';
        if(env == 'production') uri = process.env.CONN_DB_PROD
        mongoose.connect(uri)
         .then(()=>{
             console.log('Database connected!');
             return callback();
         }).catch((err)=>{
             console.log('Error connecting:', err);
             return callback(err);
         })
    }
}