'use strict';
const express = require('express');
const app = express();
const port = process.env.port || 1337;
const bodyParser = require('body-parser');
const os = require('os');

//Controllers
const consultasController = require('./Controllers/ConsultasController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api',consultasController);


app.listen(port, () => {
    const netInterface = os.networkInterfaces();
    const datetime = new Date();
    const ip = Object.values(netInterface).map(x => x.map(y => y.address))[1][0];
    const message = `Server running on http://${ip}:${port}\nStarted at: ${datetime}`;
    console.log(message);
});
