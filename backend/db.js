var mdbClient = require("mongodb").MongoClient;
var test = require("./speedTest.js");

var url = "mongodb://localhost:27017/";






function insert(data) {
    mdbClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;

        console.log("Connected to 'speedDB' (MongoDB)");

        var dbo = db.db("speedDB");

        dbo.collection("speed").insertOne(data, function (err) {
            if (err) throw err;
            console.log("1 document inserted" + "\n" + err + "\n");
            db.close();
        });


    })
}


function drop() {
    mdbClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;

        console.log("Connected to 'speedDB' (MongoDB)");

        var dbo = db.db("speedDB");

        dbo.collection("speed").drop({}, function (err, res) {
            if (err) throw err;
            console.log("deleted all data");
            db.close();
        });


    })
}


function selectData(datefrom, dateto) {
    mdbClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;

        console.log("Connected to MongoDB");

        var speedDB = db.db("speedDB").collection("speed");
        var e = new Date(dateto.getFullYear(), dateto.getMonth(), dateto.getDate(), dateto.getHours());
        console.log(e);
        speedDB.find({
            d: {
                $gte: new Date(datefrom.getFullYear(), datefrom.getMonth(), datefrom.getDate(), datefrom.getHours(), 0, 0, 0),
                $lt: new Date(dateto.getFullYear(), dateto.getMonth(), dateto.getDate(), dateto.getHours(), 59, 0, 0)
            }
        }).sort({ d: 1 }).toArray((err, dat) => {
           
            console.log(resolveBuckets(dat, datefrom, dateto));
            db.close();
            return dat;
        });
    });
}

function resolveBuckets(dat, datefrom, dateto){
    arr = [];
    dat.forEach(el => {
        for (let index = 0; index <= 60; index = index + 1) {
            if( el.p[index] != null){                
                var d = el.d.setMinutes(index);
                console.log(d, datefrom);
                 if (new Date(d) > datefrom ) {
                    arr.push({ y: el.p[index], x: new Date(d) } );
                 }
            }
        }
    });
    return arr;
}

exports.insert = insert;
exports.selectData = selectData;