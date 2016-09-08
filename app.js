var express = require('express');
var Request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.json());


var CLOUDANT_USERNAME="amandamjlee";
// The name of your database
var CLOUDANT_DATABASE="howisthemusictoday";

var CLOUDANT_KEY="videdinhakingstahuraidep";
var CLOUDANT_PASSWORD="8b1d2cba10fc2cdb404a4b801ca0ce8a3a445c7b";

var CLOUDANT_URL = "https://" + CLOUDANT_USERNAME + ".cloudant.com/" + CLOUDANT_DATABASE;



app.get("/", function (request, response) {
	console.log("In main route");
	response.render('index');
});


app.post("/save", function (request, response) {
	console.log("Making a post!");

	Request.post({
		url: CLOUDANT_URL,
		auth: {
			user: CLOUDANT_KEY,
			pass: CLOUDANT_PASSWORD
		},
		json: true,
		body: request.body
	},
	function (err, res, body) {
		if (res.statusCode == 201){
			console.log('Doc was saved!');
			response.json(body);
		}
		else{
			console.log('Error: '+ res.statusCode);
			console.log(body);
		}
	});
});


app.get("/test", function (request, response) {
	console.log("In test route");

	var theData = { msg: "Test worked" };

	response.json(theData);
});


app.get("/api/all", function (req, res){
	console.log("give me data back");

	Request.get({

		url: CLOUDANT_URL + "/_all_docs?include_docs=true",
		auth: {
			user: CLOUDANT_KEY,
			pass: CLOUDANT_PASSWORD
		},
		json: true
	},function (error, response, body){
		var theRows = body.rows;
		//Send the data
		res.json(theRows);
	});



});

app.listen(3000);
console.log('Express started on port 3000');


var port = process.env.PORT || 3000;