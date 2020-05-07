var express = require('express');
var dotenv = require('dotenv');
var bodyParser = require('body-parser')
var path = require('path')
dotenv.config();


var fs = require('fs');
var app = express();
var port = 3000;

// parse application/json
app.use(bodyParser.json())

function getFileName(){

	function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

	var date = new Date()

	return date.getUTCFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate()) +
        '-' + pad(date.getUTCHours()) +
        '-' + pad(date.getUTCMinutes()) +
        '-' + pad(date.getUTCSeconds())

}

app.post('/api/save_recording', function (req, res) {

	console.log('req', req.body);

	var name = getFileName() + '.mp3'; 

	var buf = new Buffer(req.body.blob, 'base64'); // decode
	fs.writeFile("public/audio/" + name, buf, function(err) {
	    if(err) {
	      console.log("err", err);
	    } else {
	      return res.json({'status': 'success', 'url': 'audio/' + name});
	    }
	  }); 
})
// Set public folder as root
app.use(express.static('public'));


app.listen(port, () => {
  console.info('listening on %d', port);
});