var express = require('express');
var dotenv = require('dotenv');
var bodyParser = require('body-parser')
var path = require('path')

// var Lame = require("node-lame").Lame;
var ffmpeg = require('ffmpeg')

// var multer = require('multer');
// var upload = multer();

dotenv.config();


var fs = require('fs');
var app = express();
var port = 3000;

// var upperBound = '1gb';
// app.use(bodyParser.urlencoded({extended: false, limit: upperBound}));
app.use(bodyParser.json());

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

function bufferToMp3(name, buf){

  // console.log('bufferToMp3', buf)

  return new Promise(function(resolve, reject){

    var encoder = new Lame({
        "output": "./public/audio/" + name,
        "bitrate": 128
      }).setBuffer(buf);


      encoder.encode()
          .then(() => {

              console.log("./public/audio/" + name + ' encoded')

              resolve()
          })
          .catch((error) => {

              console.log('error',error);
              // Something went wrong
          });

  })

}

app.post('/api/save_recording', function (req, res) {

  // console.log('req', req.body);
  // console.log('file', req.file);

  console.log('req.', req.body)
  console.log('req', req.files)

	var name = getFileName(); 

  var buf = Buffer.from(req.body.blob, 'base64'); // decode

  fs.writeFile("public/audio/" + name, buf, function(err) {

    var proc = ffmpeg("public/audio/" + name);

    proc.then(function(audio){

        audio.fnExtractSoundToMP3("public/audio/" + name + '.mp3', function(error, file){

          console.log('error', error);

          return res.json({'status': 'success', 'url': 'audio/' + name + '.mp3'});

        })

    })

    

  })

	// var buf = Buffer.from(req.body.blob, 'base64'); // decode

  // bufferToMp3(name, req.body.blob).then(function(data){
  //   return res.json({'status': 'success', 'url': 'audio/' + name});
  // })

	// fs.writeFile("public/audio/" + name, buf, function(err) {
	//     if(err) {
	//       console.log("err", err);
	//     } else {
	//       return res.json({'status': 'success', 'url': 'audio/' + name});
	//     }
	//   }); 
})
// Set public folder as root
app.use(express.static('public'));


app.listen(port, () => {
  console.info('listening on %d', port);
});