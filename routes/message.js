var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.post('/', function (req, res, next) {
    const object = {
        stauts: true,
        query: req.query
    };
    
    const response = _.merge(object, req.body);
    console.log("TESTEEEE" , response);

    var json = JSON.stringify(response);
    var fs = require('fs');
    
    fs.writeFile(__dirname + '/data.json', json, 'utf8', function(err){
        if (err) throw err;
    });

    res.send(response);


});

module.exports = router;
