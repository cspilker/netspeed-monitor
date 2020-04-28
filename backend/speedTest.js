var speedtest = require("speedtest-net");
var nmap = require("node-nmap");


//returns ping, download/upload speed, timestamp for use in DB 
exports.getTestResults = function getTestResults(cb) {
    (async () => {

        try {
            var res = await speedtest({ verbosity: 0, acceptLicense: true, acceptGdpr: true });
            
            var data = new Object();
            data.timestamp = res.timestamp;
            data.down = Math.floor(res.download.bandwidth / 100000);
            data.up = Math.floor(res.upload.bandwidth / 100000);
            data.ping = Math.floor(res.ping.latency);

        } catch (err) {

            var data = new Object();
            data.timestamp = new Date();
            data.down = 0;
            data.up = 0;
            data.ping = null;

            //console.log(err.message);

        } finally {
            cb(data);
        }
    })();
}


exports.getStatus = function getStatus(cb) {
    (async () => {

        try {
            var res = await speedtest({ verbosity: 3, acceptLicense: true, acceptGdpr: true, serverId: 4087 });

            var data = new Object();
            data.id = res.server.id;
            data.timestamp = res.timestamp;
            data.down = res.download.bandwidth;
            data.up = res.upload.bandwidth;
            data.ping = res.ping.latency;
            data.isp = res.isp;
            data.srvrName = res.server.name;
            data.srvrLocation = res.server.location;
            data.srvrHost = res.server.host;

        } catch (err) {

            var data = new Object();
            data.timestamp = Date.now();
            data.down = 0;
            data.up = 0;
            data.ping = null;
            data.isp = null;
            data.srvrName = null;
            data.srvrLocation = null;
            data.srvrHost = null;

            console.log(err.message);

        } finally {

            cb(data);
        }
    })();
}

exports.getDevices = function getDevices(cb) {
    var scan = new nmap.NmapScan('192.168.178.*','-sP');
    scan.on('complete',function(data){
        console.log(data);
        cb(data.length);
      });

  console.log("dv");
}

