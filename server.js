const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
var bodyParser = require('body-parser')

// var url ="mongodb+srv://beenibennygmailcom:thisismypasswordformlab@chatappcluster.utsjb.mongodb.net/chatApp?retryWrites=true&w=majority"
// //         mongodb+srv://beenibennygmailcom:<password>@chatappcluster.utsjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// var port =  8000;
// var database ="spritle";

// var commonDB ="users";
// const uri = "mongodb+srv://beenibennygmailcom:<password>@chatappcluster.utsjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// { useUnifiedTopology: true, useNewUrlParser: true }
//var url = "mongodb+srv://beenibennygmailcom:thisismypasswordformlab@chatappcluster.utsjb.mongodb.net/chatApp?retryWrites=true&w=majority";
 const url = "mongodb+srv://tester123:tester123@chatappcluster.utsjb.mongodb.net/chatApp?retryWrites=true&w=majority";
 //mongodb+srv://beenibennygmailcom:<password>@chatappcluster.utsjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 //mongodb+srv://beenibennygmailcom123:beenibennygmailcom123@chatappcluster.utsjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
var port =  8000;
var database ="spritle";

var usersDB ="users";
var trainDB ="train";
var ticketDB ="ticket";


app.use(express.static(__dirname));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render(`welcome.ejs`);
});

app.get('/login',(req,res)=>{
    res.render(`login.ejs`);
});

app.get('/signIn',(req,res)=>{
    res.render(`signin.ejs`);
});
app.get('/ticketBooking',(req,res)=>{
    res.render(`ticketBooking.ejs`);
});

app.get('/trainDetails',(req,res)=>{
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        
        dbo.collection(trainDB).find().toArray( function (err, result) {
            if (err)   throw err;
            
            // console.log(result)
            // console.log("(result")
            
            res.status(200).send(result)
        });
        db.close();
    });
});

app.get('/ticketDetails/:trainid',(req,res)=>{
    var trainID=req.params.trainid;
  
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        console.log(trainID)
        dbo.collection(ticketDB).find({trainID}).toArray( function (err, result) {
            if (err) throw err;
            console.log(result[0].seats)
            return res.send(result[0])
        });
        db.close();
    });
});




app.post('/UserLogin',(req,res)=>{
    var name=req.body.user.username;
    var password= req.body.user.password;
    var user={
        name,
        password,
        
    };
    console.log(user)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        
        dbo.collection(usersDB).findOne({name,password},{ projection: { _id: 0, name: 1}}, function (err, result) {
            if (err) throw err;
            //console.log(result)
            if(!result) return res.status(401).send("UnAuthorized.");
            res.status(200).send("Authorized.");
        });
        db.close();
    });
});

var tableid=["6078bf755548480786e8f000","6078bfdd5548480786e8f001","6078c0225548480786e8f002","6078c0655548480786e8f003"]

// .update({"events.profile":10},{$set:{"events.$.handled":0}},false,true)
app.get('/resetDB',async (req,res)=>{
    MongoClient.connect(url,async function (err, db) {
        if (err) throw err;
     //   console.log(db.listCollections())
       // console.log("dfyh")
        var dbo = db.db(database);

        await dbo.collection(ticketDB).find().forEach(async function(doc){

                console.log(doc.trainID)
                await  dbo.collection(ticketDB).updateOne({"trainID":doc.trainID}, { $set: { seats: [] }}, function(err, result){
                    if(err)
                    {
                        if(err) {
                            res.statusCode=500;

                            return res.status(500).send(err)
                            
                        }
                    }
                        // res.send(result);
                        console.log("empty")
                    });
                await dbo.collection(ticketDB).updateMany({"trainID":doc.trainID}, { $set: { seats:
                            [{
                                "seatNumber": "0",
                                "type": "window",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "1",
                                "type": "middle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "2",
                                "type": "aisle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "3",
                                "type": "aisle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "4",
                                "type": "middle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "5",
                                "type": "window",
                                "booked": "false"
                            }, {
                                "seatNumber": "6",
                                "type": "window",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "7",
                                "type": "middle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "8",
                                "type": "aisle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "9",
                                "type": "aisle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "10",
                                "type": "middle",
                                "booked": "false",
                                "gender": "null"
                            }, {
                                "seatNumber": "11",
                                "type": "window",
                                "booked": "false",
                                "gender": "null"
                            },
                        ] }}, function(err, innerresult){
                            if(err) {
                                res.statusCode=500;
                              
                                return res.status(500).send(err)
                            }
                          console.log(innerresult);
                    });
        });
        res.statusCode=200;
        res.render("login.ejs")
        db.close();
    });
});




app.post('/UserSignIn',(req,res)=>{
var name=req.body.user.username;
var password= req.body.user.password;
var age= req.body.user.age;
var user={
    name,
    password,
        age,
    };
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);

    dbo.collection(usersDB).updateOne(
    {name:name}, 
    { $setOnInsert:  user },
    { upsert: true },
        function (err, result) {
        if (err) throw err;
        // console.log(result)
        console.log(result.matchedCount)
        if(result.matchedCount!=0) return res.status(406).send("User already Exist.")

        return  res.status(200).send("Data Inserted.")
    });
    db.close();
});
});

// dbo.collection(ticketDB).updateMany({"seats.$.booked":true},{$set:{"seats.$.booked":false,"seats.$.gender":null}},false,true,
// function (err, result) {
// if (err) throw err;
// // console.log(result)
// // console.log(result.matchedCount)
// if(result.matchedCount!=0) return res.status(406).send("User already Exist.");

// return  res.status(200).send("Data Inserted.");

// });


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db(database);

//     dbo.collection(usersDB).insertOne(user, function (err, result) {
//         if (err) throw err;
//         res.status(201).send("Data Inserted.")
//     });
//     {"company": "test"},
//     { $setOnInsert: { "name": "nameVal2", ... } },
//     { upsert: true }
//     db.close();
// });














app.get('/fdfdfdf',(req,res)=>{

    

    MongoClient.connect(url, function (err, db) {
        var dbo = db.db(database);
        var user={
            name : req.body.userName,
            password : req.body.password,
            age : req.body.age,
        };
        dbo.collection(usersDB).insertOne(user, function (err, res) {
            if (err) throw err;
           
            console.log("User Inserted")
        });
        db.close();
    });
    res.send("sdsd")



    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        console.log(db)
        if (err) throw err;
        var dbo = db.db(database);
       
        dbo.collection(usersDB).insertOne(user, function (err, res) {
            if (err) throw err;
           
            console.log("User Inserted")
        });
        db.close();
    });

})

app.listen(port,()=>
{
    console.log("started");
})

















// "seats": [{
//     "seatNumber": "0",
//     "type": "window",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "1",
//     "type": "middle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "2",
//     "type": "aisle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "3",
//     "type": "aisle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "4",
//     "type": "middle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "5",
//     "type": "window",
//     "booked": "false"
// }, {
//     "seatNumber": "6",
//     "type": "window",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "7",
//     "type": "middle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "8",
//     "type": "aisle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "9",
//     "type": "aisle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "10",
//     "type": "middle",
//     "booked": "false",
//     "gender": "null"
// }, {
//     "seatNumber": "11",
//     "type": "window",
//     "booked": "false",
//     "gender": "null"
// }],