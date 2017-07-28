//Import All Required Node Modules
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var ejs =require("ejs");


//Initialize and express app
var app = express()

//View engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
routes=require('./routes');
var db=require('./db');

//Setting up port
app.set('port', (process.env.PORT || 5000))


//Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//Process application/json
app.use(bodyParser.json())


// Setup social-login
var socialLoginClass    = require("social-login");
 
// Init
var socialLogin			= new socialLoginClass({
	returnRaw:  true,
    app:	app,    // ExpressJS instance
    url:	'http://localhost:5000',  // Your root url
    onAuth:	function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {
        
        // This is the centralized method that is called when the user is logged in using any of the supported social site.
        // Setup once and you're done.
        console.log(profile);
 	
            done(null, profile);   // Return the user and continue

    }
});
 
// Setup the various services:
socialLogin.use({
    facebook:	{
        settings:	{
            clientID:		"498123710531802",
            clientSecret: 	"2d617c64916626151b904144977e1a75",
            authParameters:	{
                scope: ''
            }
        },
        url:	{
            auth:		"/auth/facebook",           // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
            callback: 	"/auth/facebook/callback",  // The Oauth callback url as specified in your facebook app's settings
            success:	'/',                        // Where to redirect the user once he's logged in
            fail:		'/auth/facebook/fail'       // Where to redirect the user if the login failed or was canceled.
        }
    }
});

//Index route
app.get('/', routes)
app.get('/api', routes)
app.get('/contact', routes)
app.get('/privacy', routes)
app.get('/tos', routes)
app.get('/admin', db.admin)
app.post('/create', db.createNewShortUrl)
app.get('/:url', db.redirectUrl)
app.post('/check', db.checkCustomKey)
app.get('/login',routes);
//Spin up the server
app.listen(app.get('port'), function() {
    console.log('App running on port', app.get('port'))
})