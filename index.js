var request = require('request');
var ejs = require('ejs');

var express = require('express');
var app = express();

app.use(express.static('views'));
app.set('view engine', 'ejs');

var key = "4ed75158af45aeeb2df0525d0af7e52c";
var token = "159afbf454811016be493bce6978b565c52f0d2a6669a0d969e3db9d533ad060";
var board = "9TgrKdIZ";

var trelloUrl = "https://api.trello.com/1/boards/"+ board +"/cards?key="+ key +"&token="+ token +"&fields=url,name,shortLink,idMembersVoted,labels,dateLastActivity";
console.log("Sortie de l'API Trello", trelloUrl);

app.get('/', function (req, res) {
/*  res.send('Hello World!');*/
	request.get(trelloUrl, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.render('index', { data: JSON.parse(body) }) // Show the HTML for the Google homepage. 
		}
	});
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 3000!');
});
