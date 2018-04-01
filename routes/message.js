const express = require('express');
const router = express.Router();
const _ = require('lodash');
const https = require("https");

router.post('/', function (req, res, next) {
    const object = {
        stauts: true,
        query: req.query
    };
    
    const response = _.merge(object, req.body);
    let message = `Status Bot: ${response.monitorFriendlyName} is ${response.alertTypeFriendlyName}. Detalhes: ${response.alertDetails}`;
    let json = {
        text: message
    } 
    console.log("MESSAGE REVIECED" , response);
    console.log("QUERY", req.query);

    var options = {
        hostname: 'chat.googleapis.com',
        port: 443,
        path: `/v1/spaces/AAAAAZm1MIo/messages?key=${process.env.GCHAT_KEY}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    var req = https.request(options, function (res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
            console.log('Body: ' + body);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(json));
    req.end();
    
    
    res.send(response);


});

module.exports = router;
