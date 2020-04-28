var test = require("./speedTest.js");
var db = require("./db.js");


var active = false;

//test.getTestResults((data) => {db.insert(data)});
// test.getTestResults((data) => {db.insert(data)});

function startMonitor() {
    if (!active){
        var i = setInterval(() => {
            console.log("diese");
            test.getTestResults((data) => { db.insert(data) });

            if (active == false) {
                clearInterval(i);
            }
        }, 60000);}
}

exports.stopMonitor = function stopMonitor() {
    active = false;
}


exports.startMonitor = startMonitor;