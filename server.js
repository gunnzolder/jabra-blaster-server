var app = require('express')();
var http = require('http').Server(app);

var blaster = require('./blaster');

app.get('/', function(req, res){

    console.log(req.query);

    if(req.query.seconds) {

        if(!isNaN(req.query.seconds)) {

            var seconds = req.query.seconds;
            var url = req.query.url;
            blaster.runInLimitedTime(seconds, url);
            res.send(seconds);

        } else { res.send("Not a valid query: "+req.query.seconds);}

    } else if (req.query.requests) {

        res.send("Number of requests to make: "+req.query.requests);

    } else { res.send("please attach a valid query!") }

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});