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
            console.log("1 document inserted"+"\n"+err+"\n");
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


 function selectData() {
    mdbClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;

        console.log("Connected to 'speedDB' (MongoDB)");

        var dbo = db.db("speedDB");

        dbo.collection("speed").find().toArray((err, data) => {
            if (err) throw err;
            console.log(data);
            db.close();
            return data;
        });
        
        
    })

}

exports.insert = insert;
exports.selectData = selectData;