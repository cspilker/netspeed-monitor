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

        speedDB.find({
            d: {
                $gte: new Date(datefrom),
                $lt: new Date(dateto)
            }
        }).sort({ d: 1 }).toArray((err, dat) => {
           
            console.log(resolveBuckets(dat));
            db.close();
            return dat;
        });
    });
}

function resolveBuckets(dat){
    arr = [];
    dat.forEach(el => {
        for (let index = 0; index <= 60; index = index + 1) {
            if( el.p[index] != null){
            arr.push({ y: el.p[index] } );
            }
        }
    });
    return arr;
}

exports.insert = insert;
exports.selectData = selectData;