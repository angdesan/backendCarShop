const config = require('./../lib/env').getConfig()

const corsOptions = {
    origin: (origin, callback) =>{
        const whitelist = config.cors.whitelist
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
          } else {
            callback(
              new Error(
                `No esta en la lista de dominios permitidos por CORS [${origin}]: ${whitelist}`
              )
            )
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;