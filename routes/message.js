var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.post('/', function (req, res, next) {
    const object = {
        stauts: true,
        query: req.query
    };
    
    const response = _.merge(object, req.body);
    console.log("MESSAGE REVIECED" , response);

    var json = JSON.stringify(response);
    var fs = require('fs');
    
    res.send(response);


});

module.exports = router;
