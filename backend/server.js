var monitor = require("./monitor.js");
var speed = require("./speedTest.js");
var db = require("./db.js");
const cors = require('cors');
const dns = require('dns');

var express = require('express');
var app = express();
var saved_status = { ping: 0, down: 0, up: 0 };




app.use(cors());

function startServer() {
    var server = app.listen(8081, function () {

        var port = server.address().port

        dns.lookup(require('os').hostname(), function (err, add, fam) {
            console.log("Backend Server running at http://" + add + ':' + port)
        });

    });
}


app.get('/api/getStatus/', function (req, res) {
    console.log('Incoming GET request:  \'getStatus\'');
    if (req.query.saved_status) {
        res.json(saved_status);

    } else {

        speed.getStatus((data) => {
            saved_status = data;
            res.json(data);
            console.log(data);

            console.log('GET request \'getStatus\' has been processed');
        });
    }
});


app.get('/api/getTestResults/', function (req, res) {
    console.log('Incoming GET request:  \'getTestResults\'');

    let fromDatetime = new Date(req.query.fromDatetime);
    let toDatetime = new Date(req.query.toDatetime);

    // console.log(fromDatetime.getHours() + '' +  toDatetime);
    console.log('from:', fromDatetime, toDatetime);
    console.log("res: " + db.selectData(fromDatetime, toDatetime));

    var data = {
            labels: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            ping: [null, null, 11, 15, 20, 27, 40, 20, 11, 15, 20, 27, 40, 20, 11, 15, 20, 27, 40, 20, 11, 15, 20, 27, 40, 20, 11, 15, 20, 27, 40, 20, 11, 15, 20, 27, 40, 20, 11, 15, 20, 27],
            up: [null, null, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90],
            down: [null, null, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90, 60, 50, 55, 54, 70, 90],
    };
    res.json(data);

    console.log('sent response  \'getTestResults\'');
});


app.get('/api/startMonitor/', function (req, res) {
    console.log('Incoming GET request:  \'startMonitor\'');
    monitor.startMonitor();
    res.json({ monitorActive: true, activeBefore: true });
})


app.get('/api/getMonitorStatus/', function (req, res) {
    console.log('Incoming GET request:  \'getMonitorStatus\'');
    setTimeout(() => {
        res.json({ monitorActive: true}); 
    }, 2000);
 
})



app.get('/api/stopMonitor/', function (req, res) {
    console.log('Incoming GET request:  \'stopMonitor\'');
    monitor.stopMonitor();
    res.send('stopped Monitoring');
})

app.get('/api/getActiveDevices/', function (req, res) {
    console.log('Incoming GET request:  \'getActiveDevices\'');
    speed.getDevices((resp) => { res.json({ dev: resp }) });
});





startServer();

exports.startServer = startServer;