const config = {
    database:{
        name: 'dbCarShop' 
    },
    server: {
        port:10000
    },
    jwt:{
        expiration:{
            login: '1d'
        },
        secretKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    },
    cors:{
        whitelist: [
            'http://localhost:3000',
            'http://localhost:10000'
        ]
    }
}
module.exports = config;