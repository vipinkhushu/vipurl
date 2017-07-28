var express = require('express')
var app = express()
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index',{data:''})
})

app.get('/api', function (req, res) {
    res.render('api')
})

app.get('/contact', function (req, res) {
    res.send('Feature Under Development, Comming Soon')
})

app.get('/privacy', function (req, res) {
    res.send('Feature Under Development, Comming Soon')
})

app.get('/tos', function (req, res) {
    res.send('Feature Under Development, Comming Soon')
})

module.exports = app;