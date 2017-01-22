var express = require('express');
var app 	= express();
var http 	= require('http').Server(app);
var bodyParser = require('body-parser');		
var cors = require('cors');

//Tell node where to find static files

app.use(cors());

app.use(bodyParser.json({ type: '*/*'}));


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});

