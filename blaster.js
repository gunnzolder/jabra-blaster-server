var request = require('request'),
    chance = require('./mixins.chance'),

    eventsLib = require('./config/events.json'),
    headersLib = require('./config/headers.json');

////////////////////////////////////////////////////////

var blaster = {
    runInLimitedTime : runInLimitedTime,
    sendPieceData : sendPieceData
}

module.exports = blaster;

////////////////////////////////////////////////////////

function runInLimitedTime(seconds, url) {

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

function sendPieceData(url, events, headers) {

    if(url.indexOf('azurewebsites') > -1) {
        headers["Content-Type"] = "application/json";
        events = {"Events":events};
    } else {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        events = "data="+JSON.stringify({"Events":events});
    }

    var options = {
        uri: url,
        method: 'POST',
        json: events
    };

    request(options, function (error, response, body) {
        //console.log(response.statusCode);
        //console.log(response.statusMessage);
    });
}