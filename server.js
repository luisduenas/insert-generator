'use strict';
const express = require('express');
const app = express();
const port = process.env.port || 1337;
const bodyParser = require('body-parser');

//Controllers
const consultasController = require('./Controllers/ConsultasController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api',consultasController);


app.listen(port, () => {
    const datetime = new Date();
    const message = `Server running on Port: ${port}\nStarted at: ${datetime}`;
    console.log(message);
});
