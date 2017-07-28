var mongoose = require('mongoose');

//Database Connection
mongoose.connect('db connection string');

//Database Setup
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
}); 

//Schema Setup
var urlSchema = mongoose.Schema({
    url: String,
    key: String,
    hits: Number,
    created: String
});

//Model Setup
var Url = mongoose.model('Url', urlSchema);

exports.createNewShortUrl=  function (req, res) {
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
//Adding url Data
var u = req.body.url;
var k = req.body.key;
if(k==="")
  k=makeid();
var h = 0;
var c = new Date();
var newUrl = new Url({ url: u,key: k, hits: h,created: c});
console.log(newUrl.url+'\n '+newUrl.key+'\n '+newUrl.hits+'\n '+newUrl.created+'\n ');

newUrl.save(function (err, testEvent) {
  if (err) return console.error(err);
  console.log("Short Url Created!!");
});
res.send(k)
}



exports.redirectUrl=  function (req, res) {

var u = req.params.url;
console.log("Request for key = "+u);
    Url.findOneAndUpdate({key: u},{$inc:{hits: 1}},function (err, url) {
        if(url)
          res.redirect(url.url);
        else 
          res.send("404 | Page not found");
        if (err) return console.error(err);
    });
}

exports.admin=  function (req, res) {

    Url.find({},function (err, url) {
        res.send(url);
        if (err) return console.error(err);
    });
}

exports.checkCustomKey=  function (req, res) {

var Ukey = req.body.key;
console.log("checking for key = "+Ukey);
    Url.find({key:Ukey},function (err, url) {
        if(url.length>0)
          res.send('exists');
        else
          res.send('doesnotexists');
        if (err) return console.error(err);
    });
}
