var app = require('express')
var http = require('http').Server(app)
http.lisen(3000, function () {
    console.log('server ready on nodemon');
    
})