const config = {
    database:{
        name: 'dbCarShop' 
    },
    server: {
        port:8080
    },
    jwt:{
        expiration:{
            login: '1d'
        },
        secretKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
}
module.exports = config;