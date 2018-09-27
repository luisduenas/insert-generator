var express = require('express');
var app = express();
var port = process.env.port || 1337;
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var consultasController = require('./Controllers/ConsultasController');
app.use('/api',consultasController);


app.listen(port,function(){
    let datetime = new Date();
    let message = "Server running on Port:- " + port + "\nStarted at:- " + datetime;
    console.log(message);
});
