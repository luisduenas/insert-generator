'use strict';
const express = require('express');
const app = express();
const port = process.env.port || 1337;
const bodyParser = require('body-parser');
const os = require('os');
const ip = require("ip");
//Controllers
const consultasController = require('./Controllers/ConsultasController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api',consultasController);


app.listen(port, () => {
    const netInterface = os.networkInterfaces();
    const datetime = new Date();
    const localIP = ip.address();
    const message = `Server running on http://${localIP}:${port}\nStarted at: ${datetime}`;
    console.log(message);
});
