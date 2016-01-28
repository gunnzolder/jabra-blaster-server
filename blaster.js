var request = require('request'),
    chance = require('./mixins.chance'),

    eventsLib = require('./config/events.json'),
    headersLib = require('./config/headers.json'),

    url = 'http://jabra-place.dev/jabra-faker-test.php';
    //url = 'http://gnlogging.azurewebsites.net/api/logging';

var blaster = {
    runInLimitedTime : runInLimitedTime,
    sendPieceData : sendPieceData
}

module.exports = blaster;


function runInLimitedTime(seconds) {

    var timeout = seconds*1000;
        requestsSent = 0;

    var loop = setInterval(function(){
        requestsSent++;
        sendPieceData(url, chance.DataPiece(eventsLib), chance.Header(headersLib), requestsSent);
    },0);

    setTimeout(function(){
        clearInterval(loop);
        console.log("Requests sent: "+requestsSent);
    }, timeout);

}





function sendPieceData(url, events, headers, i) {

    if(url == 'http://gnlogging.azurewebsites.net/api/logging') {
        headers["Content-Type"] = "application/json";
        events = {"Events":events};
    } else {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        events = "data="+JSON.stringify({"Events":events});
    }

    var options = {
        uri: 'http://gnlogging.azurewebsites.net/api/logging',
        method: 'POST',
        json: events
    };

    request(options, function (error, response, body) {
        //console.log(response.statusCode);
        //console.log(response.statusMessage);
    });
}

