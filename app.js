//require('./api/data/db.js');
var express = require('express');
 multer  = require('multer');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var https = require('https');
var request = require('request');

// Define the port to run on
app.set('port', 3000);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

//app.use(multer({ dest: './'}));

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules',express.static(__dirname + '/node_modules'));
// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Add some routing
//app.use('/', routes);
//app.use('/admin', './steuern/home.html');

// Listen for requests
app.post('/', function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	console.log(req.body)
	//function sendElasticEmail(to, subject, body_text, body_html, from, fromName) {
	 // Make sure to add your username and api_key below.

	/*var post_data = querystring.stringify({
		'apikey': 'b92d35a4-2e83-41c2-9509-5c6e116ebc1a',
		'subject' : 'test in node',
		'from': 'wellnessxperts.hk@gmail.com',
		'to' : 'ashutoshmalik.am@gmail.com',
		'bodyHtml' : 'Hi',
		'bodyText' : 'Yeah',
		'isTransactional': true
	});*/

	var jsonData;

	if(req.body.content != undefined){
		console.log(req.body.content)
		jsonData = {
			'apikey': 'b92d35a4-2e83-41c2-9509-5c6e116ebc1a',
			'subject' : req.body.subject,
			'from': 'wellnessxperts.hk@gmail.com',
			'msgCC': req.body.cc,
			'to' : req.body.email,
			'bodyHtml' : req.body.content,
			'bodyText' : '',
			'isTransactional': false,
			'fromName': req.body.fromName
		}
	}else{
		console.log(req.body.text)
		jsonData = {
			'apikey': 'b92d35a4-2e83-41c2-9509-5c6e116ebc1a',
			'subject' : req.body.subject,
			'from': 'wellnessxperts.hk@gmail.com',
			'msgCC': req.body.cc,
			'to' : req.body.email,
			'bodyHtml' : req.body.text,
			'bodyText' : '',
			'isTransactional': false,
			'fromName': req.body.fromName
		}
	}

	request({
		method: 'POST',
        url:'https://api.elasticemail.com/v2/email/send', 
        form: jsonData
	},function(err,httpResponse,data){
		console.log('data'+data);
		console.log('httpResponse'+httpResponse);
		console.log('err'+err);
		var obj = JSON.parse(data);
		console.log(obj);
		res
			.status(200)
			.json({'successMessage': 'URL genorated successfully.','status':'200','success':true,'url': obj.RedirectUrl});
    });
	 
})
var server = app.listen(app.get('port'), function(err) {
  if(err){
  	console.log(err);
  }else{
	  var port = server.address().port;
	  console.log('Magic happens on port ' + port);
	}
});