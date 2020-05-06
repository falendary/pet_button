
var recordAudioStart = document.getElementById('recordAudioStart')
var recordAudioStop = document.getElementById('recordAudioStop')
var petPlayButton = document.getElementById('petPlayButton')

var rec;
var audioChunks;

function play(){

  var recordedAudio = document.getElementById('recordedAudio')

  console.log('play' );
  recordedAudio.play()

}

function startRecord(){

  recordAudioStart.disabled = true;
  recordAudioStop.disabled = false;
  audioChunks = [];
  rec.start();

  console.log("Start recording");

}
function stopRecord(){

  recordAudioStart.disabled = false;
  recordAudioStop.disabled = true;
  rec.stop();

  console.log("Stop recording");

}

function init(){

  navigator.mediaDevices.getUserMedia({audio:true})
      .then(function(stream) {

          rec = new MediaRecorder(stream);

          rec.ondataavailable = e => {

              audioChunks.push(e.data);

              if (rec.state == "inactive"){

                var blob = new Blob(audioChunks,{type:'audio/ogg'});

                blobToBase64(blob).then(function(data){

                  fetch('/api/save_recording', {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      },
                      body: JSON.stringify({
                        blob: data
                      })
                    }).then(function(data){
                      return data.json();
                    }).then(function(data){

                      console.log('data', data)

                      var recordedAudioElement = document.getElementById('recordedAudio')
                      if(recordedAudioElement) {
                        recordedAudioElement.remove()
                      }

                      var audioElement = document.createElement('audio');
                      audioElement.id = 'recordedAudio'
                      audioElement.controls = true

                      document.body.appendChild(audioElement)

                      var recordedAudioElement = document.getElementById('recordedAudio')

                      var sourceElement = document.createElement('source');

                      recordedAudioElement.appendChild(sourceElement);

                      sourceElement.src = data.url;
                      sourceElement.type = 'audio/ogg';

                      console.log("Data recorded", data);

                    })

                  })
                
              }
            }
      })

}

function blobToBase64(blob, cb) {

  return new Promise(function(resolve, reject) {

    var reader = new FileReader();

    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      resolve(base64)
    };

    reader.readAsDataURL(blob);

  })
};

init()